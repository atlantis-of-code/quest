import { Injectable } from "@angular/core";
import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Usuario } from "../../models/usuarios/usuario";

@Injectable({ providedIn: "root" })
export class UsuarioModelConfig extends AocModelConfig<Usuario> {
  constructor() {
    super(Usuario);
  }

  readonly name: AocModelConfigName = {
    singular: "usuario",
    plural: "usuarios",
    gender: AocGender.Masculine,
  };

  form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/usuarios/usuario/usuario-form.component"),
    aocUiWindowDynConfig: {
      width: 640,
      height: 640,
    },
  };

  readonly allow: AocModelConfigAllow = "all";

  readonly transform = (usuario) => usuario.nombre_completo ?? usuario.nombre;
}
