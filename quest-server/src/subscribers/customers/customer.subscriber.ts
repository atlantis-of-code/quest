import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber, FilterQuery } from '@mikro-orm/core';
import { Customer } from '../../entities/customers/customer';

@AocSubscriber
export class CustomerSubscriber implements EventSubscriber<Customer> {
  getSubscribedEntities(): EntityName<Customer>[] {
    return [ Customer ];
  }

  async beforeCreate(args: EventArgs<Customer>): Promise<void> {
    const customer = args.entity;
    if (!customer.code) {
      await this.assignCodeToCustomer(customer, args.em);
    }
  }

  async beforeUpdate(args: EventArgs<Customer>): Promise<void> {
    const customer = args.entity;
    if (!customer.code) {
      await this.assignCodeToCustomer(customer, args.em);
    }
  }

  private async assignCodeToCustomer(customer: Customer, em: EntityManager) {
    const where: FilterQuery<Customer> = { code: { $ne: null }};
    if (customer.id) {
      where.id = { $ne: customer.id };
    }
    const latestCustomer = await em.findOne(Customer, where, { orderBy: { code: 'desc' }});
    let newCode = 1;
    if (latestCustomer) {
      newCode = latestCustomer.code + 1;
    }
    customer.code = newCode;
  }
}
