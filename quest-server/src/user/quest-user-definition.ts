import { AocUserDefinition } from '@atlantis-of-code/aoc-server';
import { Usuario } from '../entities/usuarios/usuario';
import { AocUserConfig } from '@atlantis-of-code/aoc-server/aoc-common';

@AocUserDefinition(new AocUserConfig(Usuario, {
  fieldMap: {
    username: 'nombre',
    password: 'contrasenya'
  },
  populate: { grupoCollection: true, tecnico: true, repartidor: true }
}))
class QuestUserDefinition {}
