import { EntityName, EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { AnyoFiscal } from '../../entities/common/anyo-fiscal';

@Subscriber()
export class AnyoFiscalSubscriber implements EventSubscriber<AnyoFiscal> {

  getSubscribedEntities(): EntityName<AnyoFiscal>[] {
    return  [ AnyoFiscal ];
  }

  async afterUpdate(args: EventArgs<AnyoFiscal>) {
    const actualBefore = args.changeSet.originalEntity.actual;
    const actualAfter = args.changeSet.entity.actual;
    // Cambio de no actual -> actual, ponemos a no actual el que lo era antes
    if (!actualBefore && actualAfter) {
      await args.em.nativeUpdate(AnyoFiscal,
        {
          'actual': true,
          'id': { $ne: args.entity.id }
        }, {
        actual: false
      })
    }
  }

}
