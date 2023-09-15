// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { DatosFiscales } from './datos-fiscales';
import { Repartidor } from '../pedidos/repartidor';
import { Tecnico } from '../tecnicos/tecnico';

@Entity({ tableName: 'common.tipo_documento' })
export class TipoDocumento extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    DATOS_FISCALES: 'datosFiscalesCollection',
    REPARTIDOR: 'repartidorCollection',
    TECNICO: 'tecnicoCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'DatosFiscales', mappedBy: (e: DatosFiscales) => e.tipoDocumento, orphanRemoval: false })
  datosFiscalesCollection: Collection<DatosFiscales> = new Collection<DatosFiscales>(this);

  @OneToMany({ entity: () => 'Repartidor', mappedBy: (e: Repartidor) => e.tipoDocumento, orphanRemoval: false })
  repartidorCollection: Collection<Repartidor> = new Collection<Repartidor>(this);

  @OneToMany({ entity: () => 'Tecnico', mappedBy: (e: Tecnico) => e.tipoDocumento, orphanRemoval: false })
  tecnicoCollection: Collection<Tecnico> = new Collection<Tecnico>(this);

}
