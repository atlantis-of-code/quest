// Mikro-ORM imports
import {
  Collection,
  Entity,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Payment } from '../accounting/payment';

@Entity({ tableName: 'common.payment_system' })
export class PaymentSystem extends QuestEntity {
  //region Field names
  static readonly field = {
    IS_DEFAULT: 'is_default',
    NAME: 'name',
  };
  //endregion

  //region Collection names
  static collection = {
    PAYMENT: 'paymentCollection',
  };
  //endregion

  //region Fields
  @Property({ defaultRaw: 'default' })
  is_default!: boolean;
  @Property()
  name!: string;
  //endregion

  //region Mapped collections and inversed entities
  @OneToMany({ entity: () => 'Payment', mappedBy: (e: Payment) => e.paymentSystem, orphanRemoval: false })
  paymentCollection: Collection<Payment> = new Collection<Payment>(this);
  //endregion

  //region CUSTOM
  // TODO: Implement your own toString method
  toString(): string {
    return `PaymentSystem_${this.id}`;
  }
  //endregion
}
