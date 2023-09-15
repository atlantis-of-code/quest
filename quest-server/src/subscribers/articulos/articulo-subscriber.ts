import { EntityManager, EntityName, EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { Articulo } from '../../entities/articulos/articulo';
import { Almacen } from '../../entities/articulos/almacen';
import { Estoc } from '../../entities/articulos/estoc';

@Subscriber()
export class ArticuloSubscriber implements EventSubscriber<Articulo> {

  getSubscribedEntities(): EntityName<Articulo>[] {
    return [Articulo];
  }

  async beforeCreate(args: EventArgs<Articulo>) {
    await this.checkCodigo(args.em, args.entity);
  }

  async afterCreate(args: EventArgs<Articulo>) {
    const articulo = args.entity;
    const almacenes = await args.em.find(Almacen, {});
    for (const almacen of almacenes) {
      await args.em.nativeInsert(Estoc, {
        articulo,
        almacen
      });
    }
  }

  async beforeUpdate(args: EventArgs<Articulo>) {
    await this.checkCodigo(args.em, args.entity);
  }

  private async checkCodigo(em: EntityManager, articulo: Articulo) {
    if (!articulo.codigo) { // Null or zero
      const latestArticulo = await em.findOne(Articulo, {id: { $ne: articulo.id }}, {
        fields: ['codigo'],
        orderBy: {
          [Articulo.field.CODIGO]: 'desc'
        }
      });
      if (latestArticulo) {
        articulo.codigo = latestArticulo.codigo + 1;
      } else {
        articulo.codigo = 1;
      }
    }

  }

}
