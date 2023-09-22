import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Pais } from "../../models/common/pais";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PaisModelConfig extends AocModelConfig<Pais> {
  constructor() {
    super(Pais);
  }

  readonly allow: AocModelConfigAllow = "all";

  // readonly form = ['common', 'pais', 'form'];
  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/common/pais/pais-form.component"),
    aocUiWindowDynConfig: {
      width: 480,
      height: 160,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "país",
    plural: "paises",
    gender: AocGender.Masculine,
  };

  readonly transform = (pais) => pais.nombre;
}
