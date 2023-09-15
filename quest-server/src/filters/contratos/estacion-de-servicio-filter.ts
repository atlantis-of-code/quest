import { AocFilter } from '@atlantis-of-code/aoc-server';
import { EstacionDeServicio } from '../../entities/contratos/estacion-de-servicio';

@AocFilter(
  EstacionDeServicio,
  'estacionDeServicioFilter',
  (args) => {
    if (!args.payload) {
      return null;
    }
    return {
      codigo: { $startsWith: { value: args.payload, split: false, unaccented: false }},
      nombre: { $aWordStartsWith: args.payload }
    }
  }
)
export class EstacionDeServicioFilter {}
