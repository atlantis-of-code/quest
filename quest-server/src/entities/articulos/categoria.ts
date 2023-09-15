// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Articulo } from './articulo';

@Entity({ tableName: 'articulos.categoria' })
export class Categoria extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    ARTICULO: 'articuloCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Articulo', mappedBy: (e: Articulo) => e.categoria, orphanRemoval: false })
  articuloCollection: Collection<Articulo> = new Collection<Articulo>(this);

}
