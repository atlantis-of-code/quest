import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber } from "@mikro-orm/core";
import { Series } from '../../entities/common/series';

@AocSubscriber
export class SeriesSubscriber implements EventSubscriber<Series> {
  getSubscribedEntities(): EntityName<Series>[] {
    return [ Series ];
  }

  async afterCreate(args: EventArgs<Series>) {
    const series = args.entity;
    if (series.is_default) {
      await this.updateOthersToNotDefault(series, args.em);
    }
  }

  async afterUpdate(args: EventArgs<Series>) {
    const series = args.entity;
    const originalSeries = args.changeSet.originalEntity;
    if (!originalSeries.is_default && series.is_default) {
      await this.updateOthersToNotDefault(series, args.em);
    }
  }

  private async updateOthersToNotDefault(series: Series, em: EntityManager) {
    await em.nativeUpdate(Series, { id: { $ne: series.id }, type: series.type}, { is_default: false });
  }
}
