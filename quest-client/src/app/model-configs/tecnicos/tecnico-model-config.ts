import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Tecnico } from "../../models/tecnicos/tecnico";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TecnicoModelConfig extends AocModelConfig<Tecnico> {
  constructor() {
    super(Tecnico);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/tecnicos/tecnico/tecnico-form.component"),
    aocUiWindowDynConfig: {
      width: 960,
      height: 640,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "técnico",
    plural: "técnicos",
    gender: AocGender.Masculine,
  };

  readonly transform = (tecnico: Tecnico) => {
    const nombres = [tecnico.nombre_fiscal];
    if (tecnico.apellido_1) {
      nombres.push(tecnico.apellido_1);
    }
    if (tecnico.apellido_2) {
      nombres.push(tecnico.apellido_2);
    }
    return nombres.join(" ");
  };
}
