import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Country } from '../../entities/common/country';

@AocSubscriber
export class CountrySubscriber implements EventSubscriber<Country> {
  getSubscribedEntities(): EntityName<Country>[] {
    return [ Country ];
  }

  async afterCreate(args: EventArgs<Country>) {
    const country = args.entity;
    if (country.is_default) {
      await this.updateOthersToNotDefault(country, args.em);
    }
  }

  async afterUpdate(args: EventArgs<Country>) {
    const country = args.entity;
    const originalCountry = args.changeSet.originalEntity;
    if (!originalCountry.is_default && country.is_default) {
      await this.updateOthersToNotDefault(country, args.em);
    }
  }

  private async updateOthersToNotDefault(country: Country, em: EntityManager) {
    await em.nativeUpdate(
      Country,
      { id: { $ne: country.id }},
      { is_default: false }
    )
  }
}
