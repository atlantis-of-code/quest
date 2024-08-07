import { AocSubscriber } from '@atlantis-of-code/aoc-server';
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { PaymentSystem } from '../../entities/common/payment-system';

@AocSubscriber
export class PaymentSystemSubscriber implements EventSubscriber<PaymentSystem> {
  getSubscribedEntities(): EntityName<PaymentSystem>[] {
    return [ PaymentSystem ];
  }

  async afterCreate(args: EventArgs<PaymentSystem>) {
    const paymentSystem = args.entity;
    if (paymentSystem.is_default) {
      await this.updateOthersToNotDefault(paymentSystem, args.em);
    }
  }

  async afterUpdate(args: EventArgs<PaymentSystem>) {
    const paymentSystem = args.entity;
    const originalPaymentSystem = args.changeSet.originalEntity;
    if (!originalPaymentSystem.is_default && paymentSystem.is_default) {
      await this.updateOthersToNotDefault(paymentSystem, args.em);
    }
  }

  private async updateOthersToNotDefault(paymentSystem: PaymentSystem, em: EntityManager) {
    await em.nativeUpdate(
      PaymentSystem,
      { id: { $ne: paymentSystem.id }},
      { is_default: false }
    );
  }
}
