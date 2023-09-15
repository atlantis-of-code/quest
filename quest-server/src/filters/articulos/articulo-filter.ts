import { AocFilter } from '@atlantis-of-code/aoc-server';
import { Articulo } from '../../entities/articulos/articulo';

@AocFilter(
  Articulo,
  'articuloFilter',
  args => {
    if (!args.payload) {
      return null;
    }
    return {
      $or: [
        { codigo: { $startsWithNumber: args.payload }},
        { nombre: { $aWordStartsWith: args.payload }}
      ]
    };
  }
)
export class ArticuloFilter {}
