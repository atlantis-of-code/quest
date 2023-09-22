import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Ruta } from "../../models/pedidos/ruta";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RutaModelConfig extends AocModelConfig<Ruta> {
  constructor() {
    super(Ruta);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly name: AocModelConfigName = {
    singular: "ruta",
    plural: "rutas",
    gender: AocGender.Feminine,
  };

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/pedidos/ruta/ruta-form.component"),
    aocUiWindowDynConfig: {
      width: 240,
      height: 150,
    },
  };

  readonly transform = (ruta: Ruta) => ruta.nombre;
}
