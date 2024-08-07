import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber } from "@mikro-orm/core";
import { FiscalYear } from '../../entities/common/fiscal-year';

@AocSubscriber
export class FiscalYearSubscriber implements EventSubscriber<FiscalYear> {
  getSubscribedEntities(): EntityName<FiscalYear>[] {
    return [ FiscalYear ];
  }

  async afterCreate(args: EventArgs<FiscalYear>) {
    const fiscalYear = args.entity;
    if (fiscalYear.is_current) {
      await this.updateOthersToNotDefault(fiscalYear, args.em);
    }
  }

  async afterUpdate(args: EventArgs<FiscalYear>) {
    const fiscalYear = args.entity;
    const originalFiscalYear = args.changeSet.originalEntity;
    if (!originalFiscalYear.is_current && fiscalYear.is_current) {
      await this.updateOthersToNotDefault(fiscalYear, args.em);
    }
  }

  private async updateOthersToNotDefault(fiscalYear: FiscalYear, em: EntityManager) {
    await em.nativeUpdate(FiscalYear, { id: { $ne: fiscalYear.id }}, { is_current: false });
  }
}
