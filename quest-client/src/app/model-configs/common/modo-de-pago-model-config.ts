import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
} from "@atlantis-of-code/aoc-client/core/configs";
import { ModoDePago } from "../../models/common/modo-de-pago";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ModoDePagoModelConfig extends AocModelConfig<ModoDePago> {
  constructor() {
    super(ModoDePago);
  }

  readonly name: AocModelConfigName = {
    singular: "modo de pago",
    plural: "modos de pago",
    gender: AocGender.Masculine,
  };

  allow: AocModelConfigAllow = "all";

  form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/common/modo-de-pago/modo-de-pago-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 320,
      height: 150,
    },
  };

  readonly transform = (modoDePago: ModoDePago) => modoDePago.nombre;
}
