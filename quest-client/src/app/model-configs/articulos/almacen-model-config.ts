import { Injectable } from "@angular/core";
import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Almacen } from "../../models/articulos/almacen";

@Injectable({
  providedIn: "root",
})
export class AlmacenModelConfig extends AocModelConfig<Almacen> {
  constructor() {
    super(Almacen);
  }

  readonly allow: AocModelConfigAllow = "none";

  readonly name: AocModelConfigName = {
    singular: "almacén",
    plural: "almacenes",
    gender: AocGender.Masculine,
  };

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/articulos/almacen/almacen-form.component"),
    aocUiWindowDynConfig: {
      height: 200,
      width: 250,
    },
  };
  readonly transform = (almacen: Almacen) => almacen.nombre;
}
