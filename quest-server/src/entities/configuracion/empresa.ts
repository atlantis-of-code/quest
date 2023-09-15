// Mikro-ORM imports
import {
  Embedded,
  Entity,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { EmbDatosFiscales } from '../abstract/emb-datos-fiscales';
import { EmbDireccion } from '../abstract/emb-direccion';
import { EmbInfoContacto } from '../abstract/emb-info-contacto';

@Entity({ tableName: 'configuracion.empresa' })
export class Empresa extends QuestEntity {

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

  @Property()
  iva!: string;

  @Property()
  maximo_cliente_anonimo?: string;

  @Property({ nullable: true })
  serie_actual_facturas?: string;

  // Embedded

  @Embedded({ entity: () => EmbDatosFiscales, prefix: false })
  embDatosFiscales = new EmbDatosFiscales();

  @Embedded({ entity: () => EmbDireccion, prefix: false })
  embDireccion = new EmbDireccion();

  @Embedded({ entity: () => EmbInfoContacto, prefix: false })
  embInfoContacto = new EmbInfoContacto();

}
