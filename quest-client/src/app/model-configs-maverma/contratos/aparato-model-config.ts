import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Aparato } from "../../models/contratos/aparato";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AparatoModelConfig extends AocModelConfig<Aparato> {
  constructor() {
    super(Aparato);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly name: AocModelConfigName = {
    singular: "aparato",
    plural: "aparatos",
    gender: AocGender.Masculine,
  };

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/contratos/aparato/aparato-form.component"),
    aocUiWindowDynConfig: {
      width: 800,
      height: 220,
    },
  };

  readonly transform = (aparato: Aparato) => {
    const values = [];
    if (aparato.anyo) {
      values.push(aparato.anyo);
    }
    if (aparato.marca) {
      values.push(aparato.marca);
    }
    if (aparato.modelo) {
      values.push(aparato.modelo);
    }
    if (aparato.potencia) {
      values.push(aparato.potencia);
    }
    return values.join(" - ");
  };
}
