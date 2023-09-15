import { NextFunction, Request, Response } from 'express';
import * as ExcelJs from 'exceljs';
import { RequestContext } from '@mikro-orm/core';
import { Estoc } from '../../entities/articulos/estoc';
import { AocTransactionResult } from '@atlantis-of-code/aoc-server/aoc-common';
import { AocIo } from '@atlantis-of-code/aoc-server';
import { RecuentoEstoc } from '../../entities/articulos/recuento-estoc';
import { Fichero } from '../../entities/ficheros/fichero';
import { format } from 'date-fns';
import { MovimientoEstoc } from '../../entities/articulos/movimiento-estoc';

export class EstocRouterMethods {

  static cargarFicheroInventario() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Creación workbook desde el payload.
        const payload = req.body.payload; // BASE 64
        const buffer = Buffer.from(payload, 'base64');
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.load(buffer);
        const sheet = workbook.getWorksheet('estoc');
        // Preparamos transacción
        const em = RequestContext.getEntityManager();
        await em.begin();
        const transactionResult: AocTransactionResult = {};
        em.getTransactionContext().transactionResult = transactionResult;
        em.getTransactionContext().user = res.locals.user;
        em.getTransactionContext().date = new Date();
        // Recorremos excel y vamos actualizando los estocs (por ahora), aquí hay que generar movimientos asociados
        // A una entidad superior (recuento-estoc) de donde colgaran todos lo movimientos siendo así
        // "eliminables" en conjunto (on cascade delete).
        const fichero = new Fichero();
        fichero.raw = payload;
        fichero.directorio = 'recuentos_estoc';
        fichero.nombre = req.body.fileName;
        fichero.mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        fichero.referencia_classe = 'articulos.recuento_estoc';

        const recuentoEstoc = new RecuentoEstoc();
        recuentoEstoc.fecha = em.getTransactionContext().date;
        recuentoEstoc.fichero = fichero;
        await em.persist(recuentoEstoc);


        let rowIndex = 2;
        while (true) {
          const row = sheet.getRow(rowIndex);
          const id = row.getCell(1).value?.toString();
          const cantidad = row.getCell(5).value?.toString();
          if (!id || !cantidad) {
            break;
          }
          const estoc = await em.findOne(Estoc, { id });
          const movimientoEstoc = new MovimientoEstoc();
          movimientoEstoc.fecha = em.getTransactionContext().date;
          movimientoEstoc.recuentoEstoc = recuentoEstoc;
          movimientoEstoc.estoc_anterior = '-1';
          movimientoEstoc.cantidad = cantidad;
          movimientoEstoc.almacen = estoc.almacen;
          movimientoEstoc.articulo = estoc.articulo;
          movimientoEstoc.tipo = 'Recuento';
          movimientoEstoc.nombre_documento = format(recuentoEstoc.fecha, 'dd/MM/yyyy HH:mm:ss');
          movimientoEstoc.operacion_documento = 'Nuevo';
          movimientoEstoc.descripcion = 'Nuevo recuento (valor absoluto)';
          await em.persist(movimientoEstoc);
          rowIndex++;
        }
        // Commit y emitimos datos
        await em.commit();
        AocIo.emitDataToApp(res.locals.appName, transactionResult);
        res.json({ ok: true });
      } catch (e) {
        console.error(e);
        next(e);
      }
    }
  }

}
