import { AocMikroIntrospection, AocQueryBuilder, AocQueryBuilderArgs } from '@atlantis-of-code/aoc-server';
import { Pedido } from '../../entities/pedidos/pedido';

export class PedidoQueryBuilder {
  @AocQueryBuilder
  pedidoQueryBuilder(args: AocQueryBuilderArgs<Pedido>) {
    const payload = args.params.payload;
    if (!payload) {
      return;
    }
    const { qb, em } = args;
    qb.where({
      contrato: {
        cliente: AocMikroIntrospection.whereProcess(em, { 'nombre_fiscal || \' \' || apellido_1 || \' \' || apellido_2': { $aWordStartsWith: payload }})
      }
    });
    qb.orWhere({
      contrato: {
        cliente: AocMikroIntrospection.whereProcess(em, { nombre_comercial: { $aWordStartsWith: payload }})
      }
    });
    qb.orWhere({
      contrato: AocMikroIntrospection.whereProcess(em, { numero_poliza: { $startsWithNumber: payload }})
    });
  }
}
