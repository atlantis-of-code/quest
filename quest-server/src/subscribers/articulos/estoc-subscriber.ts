import { ChangeSet, ChangeSetType, EventSubscriber, FlushEventArgs, Subscriber } from '@mikro-orm/core';
import { LineaAlbaran } from '../../entities/facturacion/linea-albaran';
import { MovimientoEstoc, TipoType } from '../../entities/articulos/movimiento-estoc';
import { Big } from 'big.js';
import { Almacen } from '../../entities/articulos/almacen';
import { Articulo } from '../../entities/articulos/articulo';
import { addMilliseconds, compareAsc, format, isAfter, isEqual } from 'date-fns';
import { Estoc } from '../../entities/articulos/estoc';
import { Albaran } from '../../entities/facturacion/albaran';
import { Ticket } from '../../entities/facturacion/ticket';
import { TraspasoEstoc } from '../../entities/articulos/traspaso-estoc';
import { LineaTraspasoEstoc } from '../../entities/articulos/linea-traspaso-estoc';
import { RecuentoEstoc } from '../../entities/articulos/recuento-estoc';

/**
 * Esta clase sirve para gestionar el estoc de forma global. Todos los eventos se gestionarán en el método
 * onFlush para asegurar la coherencia de los datos.
 * - Primero miramos si hay líneas de albarán que generan o modifican movimientos de estoc
 * - Después gestionamos los nuevos movimientos de estoc que ajustaran su lista enlazada (por artículo y almacén)
 * - Finalmente actualizamos el estoc segun el último movimiento
 */
@Subscriber()
export class EstocSubscriber implements EventSubscriber {
  /**
   * Usaremos after flush pasa asignar el nombre de documento que teníamos pendiente en la descripción de un movimiento.
   * @param args
   */
  async afterFlush(args: FlushEventArgs) {
    const movimientoEstocChangeSets: ChangeSet<Partial<MovimientoEstoc>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof MovimientoEstoc);
    for (const cs of movimientoEstocChangeSets) {
      const movimientoEstoc = cs.entity;
      if (!movimientoEstoc.nombre_documento) {
        let documento: Albaran | Ticket;
        if (movimientoEstoc.lineaAlbaran?.albaranCollection?.length) {
          documento = movimientoEstoc.lineaAlbaran.albaranCollection[0];
        } else if (movimientoEstoc.lineaAlbaran?.ticketCollection?.length) {
          documento = movimientoEstoc.lineaAlbaran?.ticketCollection[0];
        }
        if (documento) {
          const nombreDocumento = await this.getNombreDocumento(documento, args);
          await args.em.nativeUpdate(MovimientoEstoc, { id: movimientoEstoc.id }, { nombre_documento: nombreDocumento })
        }
      }
    }
  }

  async onFlush(args: FlushEventArgs): Promise<void> {
    // Procesamos los cambios de albarán (fecha) que afecta la posición de los movimientos
    // await this.procesarCambioDeFechaEnAlbaranes(args);
    // Procesamos nuevos traspasos para asignar una fecha
    await this.procesarNuevosTraspasos(args);
    // Procesamos nuevas líneas de traspaso
    await this.procesarNuevasLineasDeTraspaso(args);
    // Procesamos líneas de traspaso actualizadas
    await this.procesarActualizacionesDeLineasDeTraspaso(args);
    // Procesamos las líneas de traspaso eliminadas
    await this.procesarEliminacionesDeLineasDeTraspaso(args);
    // Procesamos las nuevas líneas de albarán
    await this.procesarNuevasLineasDeAlbaran(args);
    // Procesamos las líneas de albarán actualizadas
    await this.procesarActualizacionesDeLineasDeAlbaran(args);
    // Procesamos las líneas de albarán eliminadas
    await this.procesarEliminacionesDeLineasDeAlbaran(args);
    // Procesamos los movimientos de estoc generaods en los procesos anteriores
    await this.procesarMovimientosDeEstoc(args);
  }

  private async procesarNuevosTraspasos(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<TraspasoEstoc>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof TraspasoEstoc && cs.type === ChangeSetType.CREATE);
    for (const cs of changeSets) {
      cs.entity.fecha = args.em.getTransactionContext().date;
    }
  }

  private async procesarNuevasLineasDeTraspaso(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<LineaTraspasoEstoc>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof LineaTraspasoEstoc && cs.type === ChangeSetType.CREATE);
    for (const cs of changeSets) {
      const lineaTraspasoEstoc = cs.entity as LineaTraspasoEstoc;
      const traspasoEstoc = this.getDocumento(lineaTraspasoEstoc, args);
      const movimientoEstocOrigen = new MovimientoEstoc();
      movimientoEstocOrigen.almacen = lineaTraspasoEstoc.traspasoEstoc.almacenOrigen;
      movimientoEstocOrigen.articulo = lineaTraspasoEstoc.articulo;
      movimientoEstocOrigen.lineaTraspasoEstoc = lineaTraspasoEstoc;
      movimientoEstocOrigen.cantidad = Big(lineaTraspasoEstoc.cantidad).neg().toString();
      movimientoEstocOrigen.fecha = args.em.getTransactionContext().date;
      movimientoEstocOrigen.tipo = 'Traspaso';
      movimientoEstocOrigen.nombre_documento = await this.getNombreDocumento(traspasoEstoc, args);
      movimientoEstocOrigen.operacion_documento = this.getOperacionDocumento(traspasoEstoc, args);
      movimientoEstocOrigen.descripcion = 'Nueva línea de traspaso entre almacenes (origen)';
      movimientoEstocOrigen.estoc_anterior = Number.MAX_SAFE_INTEGER.toString();
      args.uow.computeChangeSet(movimientoEstocOrigen);

      const movimientoEstocDestino = new MovimientoEstoc();
      movimientoEstocDestino.lineaTraspasoEstoc = lineaTraspasoEstoc;
      movimientoEstocDestino.articulo = lineaTraspasoEstoc.articulo;
      movimientoEstocDestino.almacen = lineaTraspasoEstoc.traspasoEstoc.almacenDestino;
      movimientoEstocDestino.cantidad = lineaTraspasoEstoc.cantidad;
      movimientoEstocDestino.fecha = args.em.getTransactionContext().date;
      movimientoEstocDestino.tipo = 'Traspaso';
      movimientoEstocDestino.nombre_documento = await this.getNombreDocumento(traspasoEstoc, args);
      movimientoEstocDestino.operacion_documento = movimientoEstocOrigen.operacion_documento;
      movimientoEstocDestino.descripcion = "Nueva línea de traspaso entre almacenes (destino)";
      movimientoEstocDestino.estoc_anterior = Number.MAX_SAFE_INTEGER.toString();
      args.uow.computeChangeSet(movimientoEstocDestino);

      args.uow.recomputeSingleChangeSet(lineaTraspasoEstoc);
    }
  }

  private async procesarActualizacionesDeLineasDeTraspaso(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<LineaTraspasoEstoc>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof LineaTraspasoEstoc && [ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const lineaTraspasoEstoc = cs.entity;
      const lineaTraspasoEstocAnterior = cs.originalEntity;
      const traspasoEstoc = this.getDocumento(lineaTraspasoEstoc, args) as TraspasoEstoc;
      const traspasoEstocAnterior = await args.em.findOne(TraspasoEstoc, { id: traspasoEstoc.id });
      const operacionDocumento = this.getOperacionDocumento(traspasoEstoc, args);
      if (traspasoEstoc.almacenOrigen.id !== traspasoEstocAnterior.almacenOrigen.id || !Big(lineaTraspasoEstoc.cantidad ?? '0').eq(lineaTraspasoEstocAnterior.cantidad)) {
        const movimientoCorreccion = new MovimientoEstoc();
        movimientoCorreccion.almacen = traspasoEstocAnterior.almacenOrigen;
        movimientoCorreccion.articulo = await args.em.findOne(Articulo, { id: lineaTraspasoEstocAnterior.articulo as any });
        movimientoCorreccion.fecha = args.em.getTransactionContext().date;
        movimientoCorreccion.operacion_documento = operacionDocumento;
        movimientoCorreccion.lineaTraspasoEstoc = lineaTraspasoEstoc as LineaTraspasoEstoc;
        movimientoCorreccion.estoc_anterior = '0';
        movimientoCorreccion.tipo = 'Traspaso';
        movimientoCorreccion.cantidad = lineaTraspasoEstocAnterior.cantidad;
        movimientoCorreccion.nombre_documento = await this.getNombreDocumento(traspasoEstoc, args);
        movimientoCorreccion.descripcion = 'Corrección línea traspaso entre almacenes (origen)';
        args.uow.computeChangeSet(movimientoCorreccion);
        const nuevoMovimiento = new MovimientoEstoc();
        nuevoMovimiento.almacen = traspasoEstoc.almacenOrigen;
        nuevoMovimiento.articulo = lineaTraspasoEstoc.articulo;
        nuevoMovimiento.fecha = args.em.getTransactionContext().date;
        nuevoMovimiento.operacion_documento = operacionDocumento;
        nuevoMovimiento.lineaTraspasoEstoc = lineaTraspasoEstoc as LineaTraspasoEstoc;
        nuevoMovimiento.estoc_anterior = '0';
        nuevoMovimiento.tipo = 'Traspaso';
        nuevoMovimiento.cantidad = Big(lineaTraspasoEstoc.cantidad).neg().toString();
        nuevoMovimiento.nombre_documento = await this.getNombreDocumento(traspasoEstoc, args);
        nuevoMovimiento.descripcion = 'Actualización línea traspaso entre almacenes (origen)';
        args.uow.computeChangeSet(nuevoMovimiento);
      }
      if (traspasoEstoc.almacenDestino.id !== traspasoEstocAnterior.almacenDestino.id || !Big(lineaTraspasoEstoc.cantidad ?? '0').eq(lineaTraspasoEstocAnterior.cantidad)) {
        const movimientoCorreccion = new MovimientoEstoc();
        movimientoCorreccion.almacen = traspasoEstocAnterior.almacenDestino;
        movimientoCorreccion.articulo = await args.em.findOne(Articulo, { id: lineaTraspasoEstocAnterior.articulo as any });
        movimientoCorreccion.fecha = args.em.getTransactionContext().date;
        movimientoCorreccion.operacion_documento = operacionDocumento;
        movimientoCorreccion.lineaTraspasoEstoc = lineaTraspasoEstoc as LineaTraspasoEstoc;
        movimientoCorreccion.estoc_anterior = '0';
        movimientoCorreccion.tipo = 'Traspaso';
        movimientoCorreccion.cantidad = Big(lineaTraspasoEstocAnterior.cantidad).neg().toString();
        movimientoCorreccion.nombre_documento = await this.getNombreDocumento(traspasoEstoc, args);
        movimientoCorreccion.descripcion = 'Corrección línea traspaso entre almacenes (destino)';
        args.uow.computeChangeSet(movimientoCorreccion);
        const nuevoMovimiento = new MovimientoEstoc();
        nuevoMovimiento.almacen = traspasoEstoc.almacenDestino;
        nuevoMovimiento.articulo = lineaTraspasoEstoc.articulo;
        nuevoMovimiento.fecha = args.em.getTransactionContext().date;
        nuevoMovimiento.operacion_documento = operacionDocumento;
        nuevoMovimiento.lineaTraspasoEstoc = lineaTraspasoEstoc as LineaTraspasoEstoc;
        nuevoMovimiento.estoc_anterior = '0';
        nuevoMovimiento.tipo = 'Traspaso';
        nuevoMovimiento.cantidad = lineaTraspasoEstoc.cantidad;
        nuevoMovimiento.nombre_documento = await this.getNombreDocumento(traspasoEstoc, args);
        nuevoMovimiento.descripcion = 'Actualización línea traspaso entre almacenes (destino)';
        args.uow.computeChangeSet(nuevoMovimiento);
      }
    }
  }

  async procesarEliminacionesDeLineasDeTraspaso(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<LineaAlbaran>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof LineaTraspasoEstoc && cs.entity.articulo && [ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const lineaTraspaso = cs.entity;
      const traspasoEstoc = await this.getDocumento(lineaTraspaso, args);
      const operacionDocumento = this.getOperacionDocumento(traspasoEstoc, args);
      const traspasoEstocOriginal = await args.em.fork().findOne(TraspasoEstoc, {id: traspasoEstoc.id});
      const nombreDocumento = await this.getNombreDocumento(traspasoEstocOriginal, args);
      const lineaTraspasoOriginal = await args.em.fork().findOne(LineaTraspasoEstoc, { id: lineaTraspaso.id });
      const movimientoCorreccionOrigen = new MovimientoEstoc();
      movimientoCorreccionOrigen.lineaTraspasoEstoc = lineaTraspasoOriginal;
      movimientoCorreccionOrigen.tipo = 'Traspaso';
      movimientoCorreccionOrigen.fecha = args.em.getTransactionContext().date;
      movimientoCorreccionOrigen.articulo = lineaTraspasoOriginal.articulo;
      movimientoCorreccionOrigen.almacen = traspasoEstocOriginal.almacenOrigen;
      movimientoCorreccionOrigen.cantidad = lineaTraspasoOriginal.cantidad;
      movimientoCorreccionOrigen.operacion_documento = operacionDocumento;
      movimientoCorreccionOrigen.nombre_documento = nombreDocumento;
      movimientoCorreccionOrigen.descripcion = `Corrección linea traspaso por eliminación (origen)`;
      args.uow.computeChangeSet(movimientoCorreccionOrigen);
      const movimientoCorreccionDestino = new MovimientoEstoc();
      movimientoCorreccionDestino.lineaTraspasoEstoc = lineaTraspasoOriginal;
      movimientoCorreccionDestino.tipo = 'Traspaso';
      movimientoCorreccionDestino.fecha = args.em.getTransactionContext().date;
      movimientoCorreccionDestino.articulo = lineaTraspasoOriginal.articulo;
      movimientoCorreccionDestino.almacen = traspasoEstocOriginal.almacenDestino;
      movimientoCorreccionDestino.cantidad = Big(lineaTraspasoOriginal.cantidad).neg().toString();
      movimientoCorreccionDestino.operacion_documento = operacionDocumento;
      movimientoCorreccionDestino.nombre_documento = nombreDocumento;
      movimientoCorreccionDestino.descripcion = `Corrección linea traspaso por eliminación (destino)`;
      args.uow.computeChangeSet(movimientoCorreccionDestino);
    }
  }

    /**
   * Este método se encarga de procesar las nuevas líneas de albarán que generarán un nuevo movimiento
   * en la base de datos
   * @param args
   * @private
   */
  private async procesarNuevasLineasDeAlbaran(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<LineaAlbaran>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof LineaAlbaran && cs.entity.articulo && cs.entity.almacen && cs.type === ChangeSetType.CREATE);
    for (const cs of changeSets) {
      const lineaAlbaran = cs.entity;
      const documento = this.getDocumento(lineaAlbaran, args);
      // Creamos un nuevo movimiento de estoc
      const movimientoEstoc = new MovimientoEstoc();
      movimientoEstoc.lineaAlbaran = lineaAlbaran as LineaAlbaran;
      movimientoEstoc.articulo = lineaAlbaran.articulo;
      movimientoEstoc.almacen = lineaAlbaran.almacen;
      movimientoEstoc.fecha = args.em.getTransactionContext().date;
      movimientoEstoc.cantidad = Big(lineaAlbaran.cantidad).mul('-1').toString();
      movimientoEstoc.tipo = documento instanceof Albaran ? 'Albarán' : 'Ticket';
      movimientoEstoc.nombre_documento = await this.getNombreDocumento(documento, args);
      movimientoEstoc.nombre_cliente = await this.getNombreCliente(documento, args);
      movimientoEstoc.operacion_documento = this.getOperacionDocumento(documento, args);
      movimientoEstoc.descripcion = `Creación de nueva línea (#${lineaAlbaran.orden})`;
      movimientoEstoc.estoc_anterior = Number.MAX_SAFE_INTEGER.toString();
      // Añadimos el movimiento de estoc al change set
      args.uow.computeChangeSet(movimientoEstoc);
      // Informamos al uow de un nuevo enlace en la línea de albarán
      args.uow.recomputeSingleChangeSet(lineaAlbaran);
    }
  }

  /**
   * Este método procesará las actualizaciones sobre líneas de albarán modificando los valores del movimiento de estoc asociado
   * @param args
   * @private
   */
  private async procesarActualizacionesDeLineasDeAlbaran(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<LineaAlbaran>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof LineaAlbaran && cs.entity.articulo && cs.entity.almacen && [ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const lineaAlbaran = cs.entity;
      // Comprobamos cambios sobre almacén, si tiene debemos generar 2 movimientos, uno de corrección sobre el almacén original
      // y otro nuevo sobre el nuevo almacén, ya no hará falta comprobar las cantidades. Si ha cambiado la cantidad bastará hacer
      // un movimiento de corrección sobre el mismo almacén.
      if (LineaAlbaran.field.CANTIDAD in cs.payload || LineaAlbaran.entity.ALMACEN in cs.payload) {
        const documento = this.getDocumento(lineaAlbaran, args);
        const tipo: TipoType = documento instanceof Albaran ? 'Albarán' : 'Ticket';
        const operacionDocumento = this.getOperacionDocumento(documento, args);
        const documentoAnterior = await args.em.fork().findOne(documento.constructor, {id: documento.id}, {populate: ['anyoFiscal', 'cliente']});
        const nombreDocumentoAnterior = await this.getNombreDocumento(documentoAnterior, args);
        const nombreClienteAnterior = await this.getNombreCliente(documentoAnterior, args);
        const movimientoCorreccion = new MovimientoEstoc();
        movimientoCorreccion.lineaAlbaran = lineaAlbaran as LineaAlbaran;
        movimientoCorreccion.tipo = tipo;
        movimientoCorreccion.operacion_documento = operacionDocumento;
        movimientoCorreccion.nombre_documento = nombreDocumentoAnterior;
        movimientoCorreccion.nombre_cliente = nombreClienteAnterior;
        movimientoCorreccion.fecha = args.em.getTransactionContext().date;
        movimientoCorreccion.articulo = lineaAlbaran.articulo;
        movimientoCorreccion.almacen = await args.em.findOne(Almacen, { id: cs.originalEntity.almacen as string});
        movimientoCorreccion.cantidad = cs.originalEntity.cantidad;
        movimientoCorreccion.descripcion = `Corrección de linea (#${lineaAlbaran.orden}) por modificación`;
        args.uow.computeChangeSet(movimientoCorreccion);
        const nombreDocumentoNuevo = await this.getNombreDocumento(documento, args);
        const nombreClienteNuevo = await this.getNombreCliente(documento, args);
        const nuevoMovimiento = new MovimientoEstoc();
        nuevoMovimiento.lineaAlbaran = lineaAlbaran as LineaAlbaran;
        nuevoMovimiento.tipo = tipo;
        nuevoMovimiento.operacion_documento = operacionDocumento;
        nuevoMovimiento.nombre_documento = nombreDocumentoNuevo;
        nuevoMovimiento.nombre_cliente = nombreClienteNuevo;
        nuevoMovimiento.fecha = addMilliseconds(movimientoCorreccion.fecha, 1);
        nuevoMovimiento.articulo = lineaAlbaran.articulo;
        nuevoMovimiento.almacen = lineaAlbaran.almacen;
        nuevoMovimiento.cantidad = Big(lineaAlbaran.cantidad).neg().toString();
        nuevoMovimiento.descripcion = `Actualización valor de linea (#${lineaAlbaran.orden}) por modificación`
        args.uow.computeChangeSet(nuevoMovimiento);
      }
    }
  }

  async procesarEliminacionesDeLineasDeAlbaran(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<LineaAlbaran>>[] =
      args.uow.getChangeSets().filter(cs => cs.entity instanceof LineaAlbaran && cs.entity.articulo && cs.entity.almacen && [ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const lineaAlbaran = cs.entity;
      const documento = await this.getDocumento(lineaAlbaran, args);
      const operacionDocumento = this.getOperacionDocumento(documento, args);
      const nombreDocumento = await this.getNombreDocumento(documento, args);
      const nombreCliente = await this.getNombreCliente(documento, args);
      const tipo: TipoType = documento instanceof Albaran ? 'Albarán' : 'Ticket';
      const lineaAlbaranOriginal = await args.em.fork().findOne(LineaAlbaran, { id: lineaAlbaran.id });
      const movimientoCorreccion = new MovimientoEstoc();
      movimientoCorreccion.lineaAlbaran = lineaAlbaranOriginal;
      movimientoCorreccion.tipo = tipo;
      movimientoCorreccion.fecha = args.em.getTransactionContext().date;
      movimientoCorreccion.articulo = lineaAlbaranOriginal.articulo;
      movimientoCorreccion.almacen = lineaAlbaranOriginal.almacen;
      movimientoCorreccion.cantidad = lineaAlbaranOriginal.cantidad;
      movimientoCorreccion.operacion_documento = operacionDocumento;
      movimientoCorreccion.nombre_documento = nombreDocumento;
      movimientoCorreccion.nombre_cliente = nombreCliente;
      movimientoCorreccion.descripcion = `Corrección de linea (#${lineaAlbaran.orden}) por eliminación`;
      args.uow.computeChangeSet(movimientoCorreccion);
    }
  }

  /**
   * Este método procesará todos los movimientos de estoc organizados por la tupla [almacen, artículo]. De este modo podemos
   * regenerar la lista enlazada a la vez. Para ello primero debemos organizar los movimientos por la tupla citada y después procesar
   * la lista, cosa que haremos en un método posterior.
   * @param args
   * @private
   */
  private async procesarMovimientosDeEstoc(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<MovimientoEstoc>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof MovimientoEstoc);
    const changeSetGroup: Map<Almacen, Map<Articulo, ChangeSet<Partial<MovimientoEstoc>>[]>> = this.agruparMovimientosDeEstoc(changeSets);
    for (const [almacen, map] of changeSetGroup.entries()) {
      for (const [articulo, subChangeSets] of map.entries()) {
        await this.procesarGrupoDeMovimientosDeEstoc(almacen, articulo, subChangeSets, args);
      }
    }
  }

  /**
   * Este método gestiona un grupo de movimientos de estoc asociados por el mismo almacén y artículo.
   * @param almacen
   * @param articulo
   * @param changeSets
   * @param args
   * @private
   */
  private async procesarGrupoDeMovimientosDeEstoc(almacen: Almacen, articulo: Articulo, changeSets: ChangeSet<Partial<MovimientoEstoc>>[], args: FlushEventArgs) {
    try {
      // Creamos un mapa de movimiento de estoc con su change set asociado, de este modo sabremos si el movimiento de estoc
      // forma parte del change set o bien está cargado de la base de datos más adelante.
      const csMap = changeSets.reduce((acc, cs) => {
        acc.set(cs.entity, cs);
        return acc;
      }, new Map<Partial<MovimientoEstoc>, ChangeSet<Partial<MovimientoEstoc>>>());
      // Primero debemos determinar la fecha mínima de los movimientos, necesitamos saber la del change set, pero también de los
      // movimientos de la base de datos, ya que los cambios deben dispararse desde el movimiento justo anterior a la fecha mínima.
      let fechaMinima: Date = changeSets.reduce((fechaMinima: Date, cs) => {
        if (!fechaMinima || isAfter(fechaMinima, cs.entity.fecha)) {
          fechaMinima = cs.entity.fecha;
        }
        return fechaMinima;
      }, undefined);

      const updateIds = changeSets.filter(cs => [ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type)).map(cs => cs.entity.id);
      const deleteIds = changeSets.filter(cs => [ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type)).map(cs => cs.entity.id);
      const emForked = args.em.fork();
      const movimientoDeBaseDeDatosConFechaMinima = await emForked.findOne(MovimientoEstoc, { id: {$in: updateIds.concat(deleteIds) }, almacen, articulo}, {orderBy: {fecha: 'asc' }});
      if (movimientoDeBaseDeDatosConFechaMinima && isAfter(fechaMinima, movimientoDeBaseDeDatosConFechaMinima.fecha)) {
        fechaMinima = movimientoDeBaseDeDatosConFechaMinima.fecha;
      }
      // Ahora tenemos la fecha mínima, buscamos el movimiento anterior que es de donde empezará la propagación de estocs.
      const movimientoAnterior = await emForked.findOne(MovimientoEstoc, {fecha: {$lt: fechaMinima}, almacen, articulo}, {orderBy: {fecha: 'desc' }});
      let proximoEstocAnterior = Big('0');
      if (movimientoAnterior) {
        proximoEstocAnterior = Big(movimientoAnterior.cantidad);
        if (movimientoAnterior.tipo !== 'Recuento') {
          proximoEstocAnterior = proximoEstocAnterior.plus(movimientoAnterior.estoc_anterior ?? '0');
        }
      }
      // Debemos recoger de la base de datos todos los movimientos que no están en el change set y se verán afectados por las actualizaciones de estoc
      const movimientosDeBaseDeDatos = await args.em.find(MovimientoEstoc, { almacen, articulo, fecha: {$gte: fechaMinima}, id: {$nin: updateIds.concat(deleteIds )}});
      // Ahora los mezclamos con los del change set y los ordenamos por fecha, no debemos procesar los que se van a eliminar
      const movimientosAProcesar = Array.from(csMap.keys()).filter(me => ![ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(csMap.get(me).type)).concat(movimientosDeBaseDeDatos as any); // 'as any' => Problemas con el Partial
      movimientosAProcesar.sort((m1, m2) => {
        if (isEqual(m1.fecha, m2.fecha)) {
          const id1 = m1.id ?? Number.MAX_SAFE_INTEGER;
          const id2 = m2.id ?? Number.MAX_SAFE_INTEGER;
          return Big(id1).cmp(id2);
        }
        return compareAsc(m1.fecha, m2.fecha)
      });
      // Procesamos los movimientos
      for (const movimientoEstoc of movimientosAProcesar) {
        movimientoEstoc.estoc_anterior = proximoEstocAnterior.toString();
        if (movimientoEstoc.tipo === 'Recuento') {
          proximoEstocAnterior = Big(movimientoEstoc.cantidad);
        } else {
          proximoEstocAnterior = proximoEstocAnterior.plus(movimientoEstoc.cantidad);
        }
        if (csMap.has(movimientoEstoc)) {
          args.uow.recomputeSingleChangeSet(movimientoEstoc);
        } else {
          args.uow.computeChangeSet(movimientoEstoc);
        }
      }
      // Actualizamos el estoc con el último movimiento
      const estoc = await args.em.findOne(Estoc, { almacen, articulo });
      estoc.cantidad = proximoEstocAnterior.toString();
      args.uow.computeChangeSet(estoc);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Este método agrupa los change sets de movimientos de estoc por almacén y artículo
   * @param changeSets
   * @private
   */
  private agruparMovimientosDeEstoc(changeSets: ChangeSet<Partial<MovimientoEstoc>>[]): Map<Almacen, Map<Articulo, ChangeSet<Partial<MovimientoEstoc>>[]>> {
    return changeSets.reduce((map, cs) => {
      const almacen = cs.entity.almacen;
      const articulo = cs.entity.articulo;
      if (!map.has(almacen)) {
        map.set(almacen, new Map());
      }
      if (!map.get(almacen).has(articulo)) {
        map.get(almacen).set(articulo, []);
      }
      map.get(almacen).get(articulo).push(cs);
      return map;
    }, new Map<Almacen, Map<Articulo, ChangeSet<Partial<MovimientoEstoc>>[]>>());
  }

  /**
   * Este método sirve para buscar el documento padre que tiene una línea de Albarán, que puede ser un
   * Ticket o bien un Albarán
   * @param linea
   * @param args
   * @private
   */
  private getDocumento(linea: Partial<LineaAlbaran | LineaTraspasoEstoc>, args: FlushEventArgs): Albaran | Ticket | TraspasoEstoc{
    let albaranArray: Albaran[] = Array.from(args.uow.getIdentityMap().getStore(args.em.getMetadata().get(Albaran.name)).values());
    albaranArray = albaranArray.concat(args.uow.getChangeSets().filter(cs => cs.entity instanceof Albaran).map(cs => cs.entity) as Albaran[]);
    for (const albaran of albaranArray) {
      for (const la of albaran.lineaAlbaranCollection) {
        if (la === linea) {
          return albaran;
        }
      }
    }
    let ticketArray = Array.from(args.uow.getIdentityMap().getStore(args.em.getMetadata().get(Ticket.name)).values());
    ticketArray = ticketArray.concat(args.uow.getChangeSets().filter(cs => cs.entity instanceof Ticket).map(cs => cs.entity) as Ticket[]);
    for (const ticket of ticketArray) {
      for (const la of ticket.lineaAlbaranCollection) {
        if (la === linea) {
          return ticket;
        }
      }
    }
    let traspasoEstocArray: TraspasoEstoc[] = Array.from(args.uow.getIdentityMap().getStore(args.em.getMetadata().get(TraspasoEstoc.name)).values());
    traspasoEstocArray = traspasoEstocArray.concat(args.uow.getChangeSets().filter(cs => cs.entity instanceof TraspasoEstoc).map(cs => cs.entity) as TraspasoEstoc[]);
    for (const traspasoEstoc of traspasoEstocArray) {
      for (const l of traspasoEstoc.lineaTraspasoEstocCollection) {
        if (l === linea) {
          return traspasoEstoc;
        }
      }
    }
    return undefined;
  }

  /**
   * Copiado de documentoPipe de la parte cliente, devuelve $$PENDIENTE_DE_PROCESAR$$ si todavia no tenemos
   * un número asignado al albarán (el flush es anterior) y, por lo tanto, deberíamos asignarlo "after create" sobre
   * movimiento estoc
   * @param documento
   * @param args
   * @private
   */
  async getNombreDocumento(documento: Albaran | Ticket | TraspasoEstoc | RecuentoEstoc, args: FlushEventArgs) {
    if (documento instanceof TraspasoEstoc || documento instanceof RecuentoEstoc) {
      return format(documento.fecha, 'dd/MM/yyyy HH:mm:ss');
    } else {
      if (!documento?.numero) {
        return undefined;
      }
      await args.em.populate(documento, ['anyoFiscal']);
      return `${documento.anyoFiscal?.anyo}/${documento.serie ?? ''}${documento.numero?.toString().padStart(4, '0')}`;
    }
    return undefined;
  }

  /**
   * Copiado de clientePipe de la parte cliente
   * @param documento
   * @param args
   * @private
   */
  async getNombreCliente(documento: Partial<Albaran | Ticket>, args: FlushEventArgs) {
    if (!documento) {
      return undefined;
    }
    await args.em.populate(documento, ['cliente']);
    const cliente = documento.cliente;
    if (!cliente) {
      return undefined;
    }
    let arr = [cliente.embDatosFiscales?.nombre_fiscal];
    if (cliente?.embDatosFiscales?.apellido_1) {
      arr.push(cliente.embDatosFiscales.apellido_1)
    }
    if (cliente.embDatosFiscales?.apellido_2) {
      arr.push(cliente.embDatosFiscales.apellido_2)
    }
    return arr.join(' ');
  }

  private getOperacionDocumento(entity: Albaran | Ticket | TraspasoEstoc, args: FlushEventArgs): string {
    const cs = args.uow.getChangeSets().find(cs => cs.entity === entity);
    if (cs) {

      if (cs.type === ChangeSetType.CREATE) {
        return 'Nuevo';
      }
      if ([ChangeSetType.UPDATE, ChangeSetType.UPDATE_EARLY].includes(cs.type)) {
        return 'Actualización';
      }
      return 'Eliminación'
    }
    return 'Sin cambios';
  }
}
