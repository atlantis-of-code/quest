import { ChangeSetType, EntityName, EventSubscriber, FlushEventArgs, Subscriber } from '@mikro-orm/core';
import { Vehiculo } from '../../entities/tecnicos/vehiculo';
import { Almacen } from '../../entities/articulos/almacen';

@Subscriber()
export class VehiculoSubscriber implements EventSubscriber<Vehiculo> {
  getSubscribedEntities(): EntityName<Vehiculo>[] {
    return [Vehiculo];
  }

  async onFlush(args: FlushEventArgs) {
    const changeSets = args.uow
      .getChangeSets()
      .filter(cs => cs.entity instanceof Vehiculo && [ChangeSetType.CREATE, ChangeSetType.UPDATE].includes(cs.type));
    for (const changeSet of changeSets) {
      const vehiculo = changeSet.entity as Vehiculo;
      const nombreAlmacen = `${vehiculo.nombre} / ${vehiculo.matricula}`;
      if (vehiculo.id) {
        await args.em.populate(vehiculo, ['almacen']);
      }
      if (!vehiculo.almacen) {
        const almacen = new Almacen();
        almacen.nombre = nombreAlmacen;
        vehiculo.almacen = almacen;
        args.uow.computeChangeSet(almacen);
        args.uow.recomputeSingleChangeSet(vehiculo);
      } else if (vehiculo.almacen.nombre !== nombreAlmacen) {
        vehiculo.almacen.nombre = nombreAlmacen;
        args.uow.computeChangeSet(vehiculo.almacen);
        args.uow.recomputeSingleChangeSet(vehiculo);
      }
    }
  }
}
