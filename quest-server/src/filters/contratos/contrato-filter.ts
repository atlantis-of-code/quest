import { AocFilter } from '@atlantis-of-code/aoc-server';
import { Contrato } from '../../entities/contratos/contrato';

@AocFilter(
  Contrato,
  'contratoFilter',
  (args) => {
    if (!args.payload) {
      return null;
    }
    return {
      $or: [
        { numero_poliza: { $startsWithNumber: args.payload } },
        { cliente: { embDatosFiscales: { nombre_fiscal: { $aWordStartsWith: args.payload }}}},
        { cliente: { embDatosFiscales: { apellido_1: { $aWordStartsWith: args.payload }}}},
        { cliente: { embDatosFiscales: { apellido_2: { $aWordStartsWith: args.payload }}}},
        { cliente: { nombre_comercial: { $aWordStartsWith: args.payload }}}
      ]
    };
  }
)
export class ContratoFilter {}
