// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { DenominacionVia } from '../common/denominacion-via';
import { Pais } from '../common/pais';

@Embeddable()
export class EmbDireccion {

  static field = {
    BLOQUE: 'bloque',
    CODIGO_POSTAL: 'codigo_postal',
    DATOS_ADICIONALES: 'datos_adicionales',
    EDIFICIO_O_URBANIZACION: 'edificio_o_urbanizacion',
    ESCALERA: 'escalera',
    GEOPOSICION: 'geoposicion',
    LOCALIDAD: 'localidad',
    MUNICIPIO: 'municipio',
    NOMBRE_VIA: 'nombre_via',
    NUMERO: 'numero',
    PISO: 'piso',
    PORTAL: 'portal',
    PROVINCIA: 'provincia',
    PUERTA: 'puerta',
  };

  static entity = {
    DENOMINACION_VIA: 'denominacionVia',
    PAIS: 'pais',
  };

  // Fields

  @Property({ nullable: true })
  bloque?: string;

  @Property({ nullable: true })
  codigo_postal?: string;

  @Property({ nullable: true })
  datos_adicionales?: string;

  @Property({ nullable: true })
  edificio_o_urbanizacion?: string;

  @Property({ nullable: true })
  escalera?: string;

  @Property({ nullable: true })
  geoposicion?: string;

  @Property({ nullable: true })
  localidad?: string;

  @Property({ nullable: true })
  municipio?: string;

  @Property({ nullable: true })
  nombre_via?: string;

  @Property({ nullable: true })
  numero?: string;

  @Property({ nullable: true })
  piso?: string;

  @Property({ nullable: true })
  portal?: string;

  @Property({ nullable: true })
  provincia?: string;

  @Property({ nullable: true })
  puerta?: string;

  // Entities

  @ManyToOne({ entity: () => 'DenominacionVia', fieldName: 'denominacion_via_id', eager: true })
  denominacionVia!: DenominacionVia;

  @ManyToOne({ entity: () => 'Pais', fieldName: 'pais_id', eager: true })
  pais!: Pais;

}
