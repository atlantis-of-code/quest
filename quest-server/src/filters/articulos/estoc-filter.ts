import { AocFilter } from '@atlantis-of-code/aoc-server';
import { Estoc } from '../../entities/articulos/estoc';

@AocFilter(
  Estoc,
  'estocFilter',
  args => {
    if (!args.payload) {
      return null;
    }
    return {
      $or: [
        { articulo: { codigo: { $startsWithNumber: args.payload }}},
        { articulo: { nombre: { $aWordStartsWith: args.payload }}},
        { almacen: { nombre: { $aWordStartsWith: args.payload }}}
      ]
    }
  }
)
export class EstocFilter {}
