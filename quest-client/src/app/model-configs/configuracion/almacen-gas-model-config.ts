import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { AlmacenGas } from "../../models/configuracion/almacen-gas";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AlmacenGasModelConfig extends AocModelConfig<AlmacenGas> {
  constructor() {
    super(AlmacenGas);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/configuracion/almacen-gas/almacen-gas-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 640,
      height: 160,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "almacén de gas",
    plural: "almacenes de gas",
    gender: AocGender.Masculine,
  };

  readonly transform = (almacen) => `${almacen.codigo} / ${almacen.nombre}`;
}
