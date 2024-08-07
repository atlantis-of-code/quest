import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import { EntityManager, EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Language } from '../../entities/common/language';

@AocSubscriber
export class LanguageSubscriber implements EventSubscriber<Language> {
  getSubscribedEntities(): EntityName<Language>[] {
    return [ Language ];
  }

  async afterCreate(args: EventArgs<Language>) {
    const language = args.entity;
    if (language.is_default) {
      await this.updateOthersToNotDefault(language, args.em);
    }
  }

  async afterUpdate(args: EventArgs<Language>) {
    const language = args.entity;
    const originalLanguage = args.changeSet.originalEntity;
    if (!originalLanguage.is_default && language.is_default) {
      await this.updateOthersToNotDefault(language, args.em);
    }
  }

  private async updateOthersToNotDefault(language: Language, em: EntityManager) {
    await em.nativeUpdate(
      Language,
      { id: { $ne: language.id }},
      { is_default: false }
    )
  }
}
