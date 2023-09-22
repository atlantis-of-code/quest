import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { DenominacionVia } from "../../models/common/denominacion-via";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DenominacionViaModelConfig extends AocModelConfig<DenominacionVia> {
  constructor() {
    super(DenominacionVia);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/common/denominacion-via/denominacion-via-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 480,
      height: 160,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "denominación vía",
    plural: "denominaciones vía",
    gender: AocGender.Feminine,
  };

  readonly transform = (denominacionVia) => denominacionVia.nombre;
}
