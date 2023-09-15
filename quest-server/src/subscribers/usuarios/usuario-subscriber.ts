import { ChangeSet, ChangeSetType, EventSubscriber, FlushEventArgs, Subscriber } from '@mikro-orm/core';
import { Usuario } from '../../entities/usuarios/usuario';
import { AocContext } from '@atlantis-of-code/aoc-server';

@Subscriber()
export class UsuarioSubscriber implements EventSubscriber<Usuario> {

  async onFlush(args: FlushEventArgs) {
    const changeSets: ChangeSet<Partial<Usuario>>[] = args.uow.getChangeSets().filter(cs => cs.entity instanceof Usuario && ![ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type));
    for (const cs of changeSets) {
      const usuario = cs.entity;
      if (usuario.contrasenya) {
        usuario.contrasenya = AocContext.getUserPasswordAssign(args.em, usuario.contrasenya) as any;
      } else if (usuario.id) {
        const existing = await args.em.fork().findOne(Usuario, usuario.id, {fields: ['contrasenya']});
        usuario.contrasenya = existing.contrasenya;
      }
      args.uow.computeChangeSet(usuario);
    }
  }
}
