// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { EmbDatosFiscales } from '../abstract/emb-datos-fiscales';
import { EmbDireccion } from '../abstract/emb-direccion';
import { EmbInfoContacto } from '../abstract/emb-info-contacto';

export class Empresa extends MavermaModel {

  static field = {
    IVA: 'iva',
    MAXIMO_CLIENTE_ANONIMO: 'maximo_cliente_anonimo',
    SERIE_ACTUAL_FACTURAS: 'serie_actual_facturas',
  };


  static embedded = {
    EMB_DATOS_FISCALES: 'embDatosFiscales',
    EMB_DIRECCION: 'embDireccion',
    EMB_INFO_CONTACTO: 'embInfoContacto',
  };


  // Fields

  iva!: string;
  maximo_cliente_anonimo?: string;
  serie_actual_facturas?: string;

  // Embedded

  embDatosFiscales: EmbDatosFiscales = new EmbDatosFiscales();
  embDireccion: EmbDireccion = new EmbDireccion();
  embInfoContacto: EmbInfoContacto = new EmbInfoContacto();

}
