import { AocMikroIntrospection, AocQueryBuilder, AocQueryBuilderArgs } from '@atlantis-of-code/aoc-server';
import { Cliente } from '../../entities/clientes/cliente';

export class ClienteQueryBuilder {
  @AocQueryBuilder
  clienteQueryBuilder(args: AocQueryBuilderArgs<Cliente>) {
    const payload = args.params.payload;
    if (!payload) {
      return;
    }
    const { qb, em } = args;
    qb.where(AocMikroIntrospection.whereProcess(em, { codigo: { $startsWithNumber: payload }}));
    qb.orWhere(AocMikroIntrospection.whereProcess(em, { nombre_comercial: { $aWordStartsWith: payload }}));
    qb.orWhere(AocMikroIntrospection.whereProcess(em, { numero_documento: { $startsWith: { value: payload, split: false, unaccented: false }}}));
    qb.orWhere(AocMikroIntrospection.whereProcess(em, {'nombre_fiscal || \' \' || apellido_1 || \' \' || apellido_2' : { $aWordStartsWith: payload }}));
  }

}
