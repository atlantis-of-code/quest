import { EntityManager, EventArgs, EventSubscriber, Subscriber } from '@mikro-orm/core';
import { Cliente } from '../../entities/clientes/cliente';

@Subscriber()
export class ClienteSubscriber implements EventSubscriber<Cliente> {

  async beforeCreate(args: EventArgs<Cliente>) {
    const cliente = args.entity;
    if (!cliente.codigo) {
      await this.asignarCodigo(cliente, args.em);
    }
  }

  private async asignarCodigo(cliente: Cliente, em: EntityManager) {
    const lastCliente = await em.find(Cliente, {}, {
      orderBy: {codigo: 'desc'},
      limit: 1
    });
    if (lastCliente.length > 0) {
      cliente.codigo = lastCliente[0].codigo + 1;
    } else {
      cliente.codigo = 1;
    }
  }

}
