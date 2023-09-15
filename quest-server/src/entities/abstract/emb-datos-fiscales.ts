// Mikro-ORM imports
import {
  Embeddable,
  ManyToOne,
  Property } from '@mikro-orm/core';
// Entities imports
import { TipoDocumento } from '../common/tipo-documento';

@Embeddable()
export class EmbDatosFiscales {

  static field = {
    APELLIDO_1: 'apellido_1',
    APELLIDO_2: 'apellido_2',
    NOMBRE_FISCAL: 'nombre_fiscal',
    NUMERO_DOCUMENTO: 'numero_documento',
  };

  static entity = {
    TIPO_DOCUMENTO: 'tipoDocumento',
  };

  // Fields

  @Property({ nullable: true })
  apellido_1?: string;

  @Property({ nullable: true })
  apellido_2?: string;

  @Property({ nullable: true })
  nombre_fiscal?: string;

  @Property({ nullable: true })
  numero_documento?: string;

  // Entities

  @ManyToOne({ entity: () => 'TipoDocumento', fieldName: 'tipo_documento_id', eager: true, nullable: true })
  tipoDocumento?: TipoDocumento;

}
