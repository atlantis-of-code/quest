import { AocSubscriber } from "@atlantis-of-code/aoc-server";
import {EntityManager, EntityName, EventArgs, EventSubscriber, FilterQuery} from "@mikro-orm/core";
import {Item} from "../../entities/items/item";

@AocSubscriber
export class ItemSubscriber implements EventSubscriber<Item> {
  getSubscribedEntities(): EntityName<Item>[] {
    return [Item];
  }
  async beforeCreate(args: EventArgs<Item>): Promise<void> {
    const item = args.entity;
    if (!item.code) {
      await this.assignCodeToItem(item, args.em);
    }
  }

  async beforeUpdate(args: EventArgs<Item>): Promise<void> {
    const item = args.entity;
    if (!item.code) {
      await this.assignCodeToItem(item, args.em);
    }
  }

  private async assignCodeToItem(item: Item, em: EntityManager) {
    const where: FilterQuery<Item> = { code: { $ne: null }};
    if (item.id) {
      where.id = { $ne: item.id };
    }
    const latestItem = await em.findOne(Item, where, { orderBy: { code: 'desc' }});
    let newCode = 1;
    if (latestItem) {
      newCode = latestItem.code + 1;
    }
    item.code = newCode;
  }
}
