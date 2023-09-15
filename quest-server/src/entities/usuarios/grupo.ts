// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Usuario } from './usuario';

@Entity({ tableName: 'usuarios.grupo' })
export class Grupo extends QuestEntity {

  static field = {
    NOMBRE: 'nombre',
  };


  static collection = {
    USUARIO: 'usuarioCollection',
  };

  // Fields

  @Property()
  nombre!: string;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => Usuario, mappedBy: (e: Usuario) => e.grupoCollection })
  usuarioCollection: Collection<Usuario> = new Collection<Usuario>(this);

}
