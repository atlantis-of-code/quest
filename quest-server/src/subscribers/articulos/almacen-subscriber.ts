import { EntityName, EventArgs, EventSubscriber } from '@mikro-orm/core';
import { Almacen } from '../../entities/articulos/almacen';
import { Articulo } from '../../entities/articulos/articulo';
import { Estoc } from '../../entities/articulos/estoc';

export class AlmacenSubscriber implements EventSubscriber<Almacen> {

  getSubscribedEntities(): EntityName<Almacen>[] {
    return [Almacen];
  }

  async afterCreate(args: EventArgs<Almacen>) {
    const almacen = args.entity;
    const articulos = await args.em.find(Articulo, {});
    for (const articulo of articulos) {
      await args.em.nativeInsert(Estoc, {
        articulo,
        almacen
      });
    }
  }

}
