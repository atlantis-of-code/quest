import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Descuento } from "../../models/contratos/descuento";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class DescuentoModelConfig extends AocModelConfig<Descuento> {
  constructor() {
    super(Descuento);
  }

  readonly name: AocModelConfigName = {
    singular: "descuento",
    plural: "descuentos",
    gender: AocGender.Masculine,
  };

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/contratos/descuento/descuento-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 800,
      height: 220,
    },
  };

  readonly transform = (descuento) => {
    return `Descuento de ${descuento.bombona.codigo_maverma} en ${descuento.contrato.numero_poliza}`;
  };
}
