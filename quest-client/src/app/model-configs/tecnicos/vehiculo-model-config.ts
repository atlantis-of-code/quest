import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Vehiculo } from "../../models/tecnicos/vehiculo";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class VehiculoModelConfig extends AocModelConfig<Vehiculo> {
  constructor() {
    super(Vehiculo);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/tecnicos/vehiculo/vehiculo-form.component"),
    aocUiWindowDynConfig: {
      width: 1024,
      height: 960,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "vehículo",
    plural: "vehículos",
    gender: AocGender.Masculine,
  };

  readonly transform = (vehiculo: Vehiculo) => {
    let ret = [vehiculo.nombre];
    if (vehiculo.matricula) {
      ret.push(vehiculo.matricula);
    }
    return ret.join(" - ");
  };
}
