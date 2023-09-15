import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Bombona } from "../../models/articulos/bombona";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class BombonaModelConfig extends AocModelConfig<Bombona> {
  constructor() {
    super(Bombona);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/articulos/bombona/bombona-form.component"),
    aocUiWindowDynConfig: {
      width: 800,
      height: 190,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "bombona",
    plural: "bombonas",
    gender: AocGender.Feminine,
  };

  readonly transform = (bombona: Bombona): string =>
    `${bombona.codigo_maverma} - ${bombona.codigo_nace}`;
}
