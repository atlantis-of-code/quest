import { AocModelMetaMap } from '@atlantis-of-code/aoc-client/core/models';

import { Cliente } from './clientes/cliente';
import { Sector } from './common/sector';
import { Subsector } from './common/subsector';
import { Albaran } from './facturacion/albaran';
import { Contacto } from './contactos/contacto';
import { Contrato } from './contratos/contrato';
import { Factura } from './facturacion/factura';
import { Fichero } from './ficheros/fichero';
import { Presupuesto } from './facturacion/presupuesto';
import { Ticket } from './facturacion/ticket';
import { EmbDatosFiscales } from './abstract/emb-datos-fiscales';
import { EmbDireccion } from './abstract/emb-direccion';
import { EmbInfoContacto } from './abstract/emb-info-contacto';
import { DatosFiscales } from './common/datos-fiscales';
import { TipoDocumento } from './common/tipo-documento';
import { DenominacionVia } from './common/denominacion-via';
import { Direccion } from './common/direccion';
import { Pais } from './common/pais';
import { Repartidor } from './pedidos/repartidor';
import { Tecnico } from './tecnicos/tecnico';
import { AnyoFiscal } from './common/anyo-fiscal';
import { ModoDePago } from './common/modo-de-pago';
import { Pedido } from './pedidos/pedido';
import { EmbDocumento } from './abstract/emb-documento';
import { EmbLineaDocumento } from './abstract/emb-linea-documento';
import { Almacen } from './articulos/almacen';
import { Articulo } from './articulos/articulo';
import { Aparato } from './contratos/aparato';
import { EstacionDeServicio } from './contratos/estacion-de-servicio';
import { Revision } from './contratos/revision';
import { Visita } from './contratos/visita';
import { AlmacenGas } from './configuracion/almacen-gas';
import { ContratoBombona } from './contratos/contrato-bombona';
import { Descuento } from './contratos/descuento';
import { Bombona } from './articulos/bombona';
import { Vehiculo } from './tecnicos/vehiculo';
import { Estoc } from './articulos/estoc';
import { LineaAlbaran } from './facturacion/linea-albaran';
import { LineaPresupuesto } from './facturacion/linea-presupuesto';
import { MovimientoEstoc } from './articulos/movimiento-estoc';
import { TraspasoEstoc } from './articulos/traspaso-estoc';
import { Categoria } from './articulos/categoria';
import { LineaTraspasoEstoc } from './articulos/linea-traspaso-estoc';
import { RecuentoEstoc } from './articulos/recuento-estoc';
import { LineaPedido } from './pedidos/linea-pedido';
import { Empresa } from './configuracion/empresa';
import { PedidoFichero } from './pedidos/pedido-fichero';
import { Usuario } from './usuarios/usuario';
import { Ruta } from './pedidos/ruta';
import { Grupo } from './usuarios/grupo';

export const meta: AocModelMetaMap = new Map();

meta.set(Cliente, {
  tableName: 'clientes.cliente',
  fields: {
    codigo: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    fecha_nacimiento: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    idioma: { type: 'string', enum: 'IdiomaEnumType', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_comercial: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    sexo: { type: 'string', enum: 'SexoEnumType', isEntity: false, isCollection: false, isEmbedded: false,  },
    sector: { type: Sector, isEntity: true, isCollection: false, isEmbedded: false,  },
    subsector: { type: Subsector, isEntity: true, isCollection: false, isEmbedded: false,  },
    albaranCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    contactoCollection: { type: Contacto, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    presupuestoCollection: { type: Presupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
    embDatosFiscales: { type: EmbDatosFiscales, isEntity: false, isCollection: false, isEmbedded: true,  },
    embDireccion: { type: EmbDireccion, isEntity: false, isCollection: false, isEmbedded: true,  },
    embInfoContacto: { type: EmbInfoContacto, isEntity: false, isCollection: false, isEmbedded: true,  },
  }
});

meta.set(DatosFiscales, {
  tableName: 'common.datos_fiscales',
  fields: {
    apellido_1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    apellido_2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_fiscal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero_documento: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipoDocumento: { type: TipoDocumento, isEntity: true, isCollection: false, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoDatosFiscalesPagadorAlternativoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaDatosFiscalesCopiaClienteCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaDatosFiscalesCopiaEmpresaCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketDatosFiscalesCopiaClienteCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketDatosFiscalesCopiaEmpresaCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(DenominacionVia, {
  tableName: 'common.denominacion_via',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    direccionCollection: { type: Direccion, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Direccion, {
  tableName: 'common.direccion',
  fields: {
    bloque: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    codigo_postal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    datos_adicionales: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    edificio_o_urbanizacion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    escalera: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    geoposicion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    localidad: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    municipio: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_via: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    piso: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    portal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    provincia: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    puerta: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    denominacionVia: { type: DenominacionVia, isEntity: true, isCollection: false, isEmbedded: false,  },
    pais: { type: Pais, isEntity: true, isCollection: false, isEmbedded: false,  },
    albaranDireccionFiscalCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    albaranDireccionObraCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoDireccionCorrespondenciaCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoDireccionFiscalCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoDireccionPagadorAlternativoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoDireccionSuministroCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaDireccionFiscalCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaDireccionObraCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    presupuestoDireccionFiscalCollection: { type: Presupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    presupuestoDireccionObraCollection: { type: Presupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketDireccionFiscalCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketDireccionObraCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Subsector, {
  tableName: 'common.subsector',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    sector: { type: Sector, isEntity: true, isCollection: false, isEmbedded: false,  },
    clienteCollection: { type: Cliente, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Pais, {
  tableName: 'common.pais',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    direccionCollection: { type: Direccion, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(TipoDocumento, {
  tableName: 'common.tipo_documento',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    datosFiscalesCollection: { type: DatosFiscales, isEntity: false, isCollection: true, isEmbedded: false,  },
    repartidorCollection: { type: Repartidor, isEntity: false, isCollection: true, isEmbedded: false,  },
    tecnicoCollection: { type: Tecnico, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Sector, {
  tableName: 'common.sector',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    clienteCollection: { type: Cliente, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    subsectorCollection: { type: Subsector, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(AnyoFiscal, {
  tableName: 'common.anyo_fiscal',
  fields: {
    actual: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    anyo: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    albaranCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    presupuestoCollection: { type: Presupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(ModoDePago, {
  tableName: 'common.modo_de_pago',
  fields: {
    codigo_nace: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    pedidoCollection: { type: Pedido, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(EmbDocumento, {
  tableName: 'abstract.emb_documento',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    observaciones: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_impuestos: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    anyoFiscal: { type: AnyoFiscal, isEntity: true, isCollection: false, isEmbedded: false,  },
    cliente: { type: Cliente, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionFiscal: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionObra: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(EmbLineaDocumento, {
  tableName: 'abstract.emb_linea_documento',
  fields: {
    cantidad: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    codigo_articulo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    descuento: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_articulo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    orden: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    precio_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacen: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    articulo: { type: Articulo, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(EmbInfoContacto, {
  tableName: 'abstract.emb_info_contacto',
  fields: {
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono3: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(EmbDatosFiscales, {
  tableName: 'abstract.emb_datos_fiscales',
  fields: {
    apellido_1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    apellido_2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_fiscal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero_documento: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipoDocumento: { type: TipoDocumento, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(EmbDireccion, {
  tableName: 'abstract.emb_direccion',
  fields: {
    bloque: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    codigo_postal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    datos_adicionales: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    edificio_o_urbanizacion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    escalera: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    geoposicion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    localidad: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    municipio: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_via: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    piso: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    portal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    provincia: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    puerta: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    denominacionVia: { type: DenominacionVia, isEntity: true, isCollection: false, isEmbedded: false,  },
    pais: { type: Pais, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Contacto, {
  tableName: 'contactos.contacto',
  fields: {
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono3: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    clienteCollection: { type: Cliente, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Aparato, {
  tableName: 'contratos.aparato',
  fields: {
    anyo: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    marca: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    modelo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    potencia: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    contrato: { type: Contrato, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(EstacionDeServicio, {
  tableName: 'contratos.estacion_de_servicio',
  fields: {
    codigo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    direccion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    localidad: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Revision, {
  tableName: 'contratos.revision',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    numero: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    resultado: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    contrato: { type: Contrato, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Visita, {
  tableName: 'contratos.visita',
  fields: {
    descripcion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    contrato: { type: Contrato, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Contrato, {
  tableName: 'contratos.contrato',
  fields: {
    fecha_alta: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    fecha_baja: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    fecha_proxima_revision: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    fecha_vencimiento_revision: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    firmado: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    matricula: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero_poliza: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    persona_contacto: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipo_suministro: { type: 'string', enum: 'TipoSuministroEnumType', isEntity: false, isCollection: false, isEmbedded: false,  },
    vehiculo: { type: 'string', enum: 'VehiculoEnumType', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacenGas: { type: AlmacenGas, isEntity: true, isCollection: false, isEmbedded: false,  },
    cliente: { type: Cliente, isEntity: true, isCollection: false, isEmbedded: false,  },
    datosFiscales: { type: DatosFiscales, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionCorrespondencia: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionFiscal: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionSuministro: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    estacionDeServicio: { type: EstacionDeServicio, isEntity: true, isCollection: false, isEmbedded: false,  },
    pagadorAlternativoDatosFiscales: { type: DatosFiscales, isEntity: true, isCollection: false, isEmbedded: false,  },
    pagadorAlternativoDireccion: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    sector: { type: Sector, isEntity: true, isCollection: false, isEmbedded: false,  },
    subsector: { type: Subsector, isEntity: true, isCollection: false, isEmbedded: false,  },
    aparatoCollection: { type: Aparato, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoBombonaCollection: { type: ContratoBombona, isEntity: false, isCollection: true, isEmbedded: false,  },
    descuentoCollection: { type: Descuento, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    pedidoCollection: { type: Pedido, isEntity: false, isCollection: true, isEmbedded: false,  },
    revisionCollection: { type: Revision, isEntity: false, isCollection: true, isEmbedded: false,  },
    visitaCollection: { type: Visita, isEntity: false, isCollection: true, isEmbedded: false,  },
    embInfoContacto: { type: EmbInfoContacto, isEntity: false, isCollection: false, isEmbedded: true,  },
  }
});

meta.set(ContratoBombona, {
  tableName: 'contratos.contrato_bombona',
  fields: {
    cantidad_contratada: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    cantidad_entregada: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    fianza: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    bombona: { type: Bombona, isEntity: true, isCollection: false, isEmbedded: false,  },
    contrato: { type: Contrato, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Descuento, {
  tableName: 'contratos.descuento',
  fields: {
    descuento_euros: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    descuento_maximo: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    descuento_porcentaje: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    fecha_fin: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    fecha_inicio: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    porcentaje_agencia: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    porcentaje_repsol: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    bombona: { type: Bombona, isEntity: true, isCollection: false, isEmbedded: false,  },
    contrato: { type: Contrato, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Almacen, {
  tableName: 'articulos.almacen',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    vehiculo: { type: Vehiculo, isEntity: false, isCollection: false, isEmbedded: false,  },
    estocCollection: { type: Estoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaAlbaranCollection: { type: LineaAlbaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaPresupuestoCollection: { type: LineaPresupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    movimientoEstocCollection: { type: MovimientoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    traspasoEstocAlmacenDestinoCollection: { type: TraspasoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    traspasoEstocAlmacenOrigenCollection: { type: TraspasoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Articulo, {
  tableName: 'articulos.articulo',
  fields: {
    codigo: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    de_alta: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    precio_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    categoria: { type: Categoria, isEntity: true, isCollection: false, isEmbedded: false,  },
    foto: { type: Fichero, isEntity: true, isCollection: false, isEmbedded: false,  },
    estocCollection: { type: Estoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaAlbaranCollection: { type: LineaAlbaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaPresupuestoCollection: { type: LineaPresupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaTraspasoEstocCollection: { type: LineaTraspasoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    movimientoEstocCollection: { type: MovimientoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Categoria, {
  tableName: 'articulos.categoria',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    articuloCollection: { type: Articulo, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Estoc, {
  tableName: 'articulos.estoc',
  fields: {
    cantidad: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacen: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    articulo: { type: Articulo, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(MovimientoEstoc, {
  tableName: 'articulos.movimiento_estoc',
  fields: {
    cantidad: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    descripcion: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    estoc_anterior: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    nombre_cliente: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_documento: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    operacion_documento: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipo: { type: 'string', enum: 'TipoType', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacen: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    articulo: { type: Articulo, isEntity: true, isCollection: false, isEmbedded: false,  },
    lineaAlbaran: { type: LineaAlbaran, isEntity: true, isCollection: false, isEmbedded: false,  },
    lineaTraspasoEstoc: { type: LineaTraspasoEstoc, isEntity: true, isCollection: false, isEmbedded: false,  },
    recuentoEstoc: { type: RecuentoEstoc, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(RecuentoEstoc, {
  tableName: 'articulos.recuento_estoc',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    fichero: { type: Fichero, isEntity: true, isCollection: false, isEmbedded: false,  },
    movimientoEstocCollection: { type: MovimientoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Bombona, {
  tableName: 'articulos.bombona',
  fields: {
    codigo_maverma: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    codigo_nace: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    fianza: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    peso: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    contratoBombonaCollection: { type: ContratoBombona, isEntity: false, isCollection: true, isEmbedded: false,  },
    descuentoCollection: { type: Descuento, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaPedidoCollection: { type: LineaPedido, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(TraspasoEstoc, {
  tableName: 'articulos.traspaso_estoc',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    almacenDestino: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    almacenOrigen: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    lineaTraspasoEstocCollection: { type: LineaTraspasoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(LineaTraspasoEstoc, {
  tableName: 'articulos.linea_traspaso_estoc',
  fields: {
    cantidad: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    articulo: { type: Articulo, isEntity: true, isCollection: false, isEmbedded: false,  },
    traspasoEstoc: { type: TraspasoEstoc, isEntity: true, isCollection: false, isEmbedded: false,  },
    movimientoEstocCollection: { type: MovimientoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Empresa, {
  tableName: 'configuracion.empresa',
  fields: {
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    maximo_cliente_anonimo: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie_actual_facturas: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    embDatosFiscales: { type: EmbDatosFiscales, isEntity: false, isCollection: false, isEmbedded: true,  },
    embDireccion: { type: EmbDireccion, isEntity: false, isCollection: false, isEmbedded: true,  },
    embInfoContacto: { type: EmbInfoContacto, isEntity: false, isCollection: false, isEmbedded: true,  },
  }
});

meta.set(AlmacenGas, {
  tableName: 'configuracion.almacen_gas',
  fields: {
    codigo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Factura, {
  tableName: 'facturacion.factura',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    observaciones: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_impuestos: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    anyoFiscal: { type: AnyoFiscal, isEntity: true, isCollection: false, isEmbedded: false,  },
    cliente: { type: Cliente, isEntity: true, isCollection: false, isEmbedded: false,  },
    copiaDatosCliente: { type: DatosFiscales, isEntity: true, isCollection: false, isEmbedded: false,  },
    copiaDatosEmpresa: { type: DatosFiscales, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionFiscal: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionObra: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    tecnico: { type: Tecnico, isEntity: true, isCollection: false, isEmbedded: false,  },
    albaranCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Presupuesto, {
  tableName: 'facturacion.presupuesto',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    observaciones: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_impuestos: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    anyoFiscal: { type: AnyoFiscal, isEntity: true, isCollection: false, isEmbedded: false,  },
    cliente: { type: Cliente, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionFiscal: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionObra: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaPresupuestoCollection: { type: LineaPresupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(LineaPresupuesto, {
  tableName: 'facturacion.linea_presupuesto',
  fields: {
    cantidad: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    codigo_articulo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    descuento: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_articulo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    orden: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    precio_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacen: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    articulo: { type: Articulo, isEntity: true, isCollection: false, isEmbedded: false,  },
    presupuesto: { type: Presupuesto, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Ticket, {
  tableName: 'facturacion.ticket',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    observaciones: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_impuestos: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    anyoFiscal: { type: AnyoFiscal, isEntity: true, isCollection: false, isEmbedded: false,  },
    cliente: { type: Cliente, isEntity: true, isCollection: false, isEmbedded: false,  },
    copiaDatosCliente: { type: DatosFiscales, isEntity: true, isCollection: false, isEmbedded: false,  },
    copiaDatosEmpresa: { type: DatosFiscales, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionFiscal: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionObra: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaAlbaranCollection: { type: LineaAlbaran, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(LineaAlbaran, {
  tableName: 'facturacion.linea_albaran',
  fields: {
    cantidad: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    codigo_articulo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    descuento: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_articulo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    orden: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    precio_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacen: { type: Almacen, isEntity: true, isCollection: false, isEmbedded: false,  },
    articulo: { type: Articulo, isEntity: true, isCollection: false, isEmbedded: false,  },
    albaranCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    movimientoEstocCollection: { type: MovimientoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Albaran, {
  tableName: 'facturacion.albaran',
  fields: {
    fecha: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    observaciones: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_base: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_impuestos: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    anyoFiscal: { type: AnyoFiscal, isEntity: true, isCollection: false, isEmbedded: false,  },
    cliente: { type: Cliente, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionFiscal: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    direccionObra: { type: Direccion, isEntity: true, isCollection: false, isEmbedded: false,  },
    factura: { type: Factura, isEntity: true, isCollection: false, isEmbedded: false,  },
    tecnico: { type: Tecnico, isEntity: true, isCollection: false, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    lineaAlbaranCollection: { type: LineaAlbaran, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Fichero, {
  tableName: 'ficheros.fichero',
  fields: {
    directorio: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    mime: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    referencia_classe: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    referencia_id: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    subdirectorio: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    albaranCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    articuloCollection: { type: Articulo, isEntity: false, isCollection: true, isEmbedded: false,  },
    articuloFicheroFotoCollection: { type: Articulo, isEntity: false, isCollection: true, isEmbedded: false,  },
    clienteCollection: { type: Cliente, isEntity: false, isCollection: true, isEmbedded: false,  },
    contratoCollection: { type: Contrato, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    pedidoFicheroCollection: { type: PedidoFichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    presupuestoCollection: { type: Presupuesto, isEntity: false, isCollection: true, isEmbedded: false,  },
    recuentoEstocCollection: { type: RecuentoEstoc, isEntity: false, isCollection: true, isEmbedded: false,  },
    repartidorCollection: { type: Repartidor, isEntity: false, isCollection: true, isEmbedded: false,  },
    tecnicoCollection: { type: Tecnico, isEntity: false, isCollection: true, isEmbedded: false,  },
    ticketCollection: { type: Ticket, isEntity: false, isCollection: true, isEmbedded: false,  },
    vehiculoFacturasCollection: { type: Vehiculo, isEntity: false, isCollection: true, isEmbedded: false,  },
    vehiculoInspeccionTecnicaCollection: { type: Vehiculo, isEntity: false, isCollection: true, isEmbedded: false,  },
    vehiculoOtrosCollection: { type: Vehiculo, isEntity: false, isCollection: true, isEmbedded: false,  },
    raw: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Tecnico, {
  tableName: 'tecnicos.tecnico',
  fields: {
    apellido_1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    apellido_2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_fiscal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero_documento: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    serie_en_facturas: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono3: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipoDocumento: { type: TipoDocumento, isEntity: true, isCollection: false, isEmbedded: false,  },
    usuario: { type: Usuario, isEntity: false, isCollection: false, isEmbedded: false,  },
    albaranCollection: { type: Albaran, isEntity: false, isCollection: true, isEmbedded: false,  },
    facturaCollection: { type: Factura, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    vehiculoCollection: { type: Vehiculo, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Vehiculo, {
  tableName: 'tecnicos.vehiculo',
  fields: {
    habilitado: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    matricula: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    almacen: { type: Almacen, isEntity: false, isCollection: false, isEmbedded: false,  },
    tecnico: { type: Tecnico, isEntity: true, isCollection: false, isEmbedded: false,  },
    ficheroFacturasCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroInspeccionTecnicaCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    ficheroOtrosCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(LineaPedido, {
  tableName: 'pedidos.linea_pedido',
  fields: {
    cantidad: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    descuento: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    orden: { type: 'number', isEntity: false, isCollection: false, isEmbedded: false,  },
    precio_unitario: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    pvp: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    suplemento: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_linea: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    bombona: { type: Bombona, isEntity: true, isCollection: false, isEmbedded: false,  },
    pedido: { type: Pedido, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Repartidor, {
  tableName: 'pedidos.repartidor',
  fields: {
    apellido_1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    apellido_2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    email: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_fiscal: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    numero_documento: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono1: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono2: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    telefono3: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    tipoDocumento: { type: TipoDocumento, isEntity: true, isCollection: false, isEmbedded: false,  },
    usuario: { type: Usuario, isEntity: false, isCollection: false, isEmbedded: false,  },
    ficheroCollection: { type: Fichero, isEntity: false, isCollection: true, isEmbedded: false,  },
    pedidoCollection: { type: Pedido, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Ruta, {
  tableName: 'pedidos.ruta',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    pedidoCollection: { type: Pedido, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Pedido, {
  tableName: 'pedidos.pedido',
  fields: {
    alta_en_nace: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    entregado: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    envio_inmediato_movilidad: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    fecha_creacion: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    fecha_entrega: { type: 'date', isEntity: false, isCollection: false, isEmbedded: false, transform: (v: any) => v ? new Date(v) : v, },
    observaciones_cliente: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    observaciones_pedido: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    peticion_factura: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    ruta_de_guardia: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    suministro_express: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    total: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    total_iva: { type: 'big', isEntity: false, isCollection: false, isEmbedded: false,  },
    urgente: { type: 'boolean', isEntity: false, isCollection: false, isEmbedded: false,  },
    contrato: { type: Contrato, isEntity: true, isCollection: false, isEmbedded: false,  },
    modoDePago: { type: ModoDePago, isEntity: true, isCollection: false, isEmbedded: false,  },
    repartidor: { type: Repartidor, isEntity: true, isCollection: false, isEmbedded: false,  },
    ruta: { type: Ruta, isEntity: true, isCollection: false, isEmbedded: false,  },
    lineaPedidoCollection: { type: LineaPedido, isEntity: false, isCollection: true, isEmbedded: false,  },
    pedidoFicheroCollection: { type: PedidoFichero, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(PedidoFichero, {
  tableName: 'pedidos.pedido_fichero',
  fields: {
    fichero: { type: Fichero, isEntity: true, isCollection: false, isEmbedded: false,  },
    pedido: { type: Pedido, isEntity: true, isCollection: false, isEmbedded: false,  },
  }
});

meta.set(Usuario, {
  tableName: 'usuarios.usuario',
  fields: {
    contrasenya: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    mail: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    nombre_completo: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    repartidor: { type: Repartidor, isEntity: false, isCollection: false, isEmbedded: false,  },
    tecnico: { type: Tecnico, isEntity: false, isCollection: false, isEmbedded: false,  },
    grupoCollection: { type: Grupo, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});

meta.set(Grupo, {
  tableName: 'usuarios.grupo',
  fields: {
    nombre: { type: 'string', isEntity: false, isCollection: false, isEmbedded: false,  },
    usuarioCollection: { type: Usuario, isEntity: false, isCollection: true, isEmbedded: false,  },
  }
});


