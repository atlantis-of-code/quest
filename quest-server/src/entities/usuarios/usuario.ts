// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToMany,
  OneToOne,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Grupo } from './grupo';
import { Repartidor } from '../pedidos/repartidor';
import { Tecnico } from '../tecnicos/tecnico';

@Entity({ tableName: 'usuarios.usuario' })
export class Usuario extends QuestEntity {

  static field = {
    CONTRASENYA: 'contrasenya',
    MAIL: 'mail',
    NOMBRE: 'nombre',
    NOMBRE_COMPLETO: 'nombre_completo',
  };

  static entity = {
    REPARTIDOR: 'repartidor',
    TECNICO: 'tecnico',
  };

  static collection = {
    GRUPO: 'grupoCollection',
  };

  // Fields

  @Property()
  contrasenya!: string;

  @Property()
  mail!: string;

  @Property()
  nombre!: string;

  @Property({ nullable: true })
  nombre_completo?: string;

  // Entities

  @OneToOne({ entity: () => 'Repartidor', fieldName: 'repartidor_id', nullable: true })
  repartidor?: Repartidor;

  @OneToOne({ entity: () => 'Tecnico', fieldName: 'tecnico_id', nullable: true })
  tecnico?: Tecnico;

  // Mapped collections and inversed entities

  @ManyToMany({ entity: () => 'Grupo', pivotTable: 'usuarios.usuario_grupo', joinColumn: 'usuario_id', inverseJoinColumn: 'grupo_id' })
  grupoCollection: Collection<Grupo> = new Collection<Grupo>(this);

}
