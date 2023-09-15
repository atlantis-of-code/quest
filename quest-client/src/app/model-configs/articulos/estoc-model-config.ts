import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Estoc } from "../../models/articulos/estoc";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EstocModelConfig extends AocModelConfig<Estoc> {
  constructor() {
    super(Estoc);
  }

  readonly name: AocModelConfigName = {
    singular: "estoc",
    plural: "estoc",
    gender: AocGender.Masculine,
  };

  readonly allow: AocModelConfigAllow = "none";

  readonly payloadServerFilterFn = "estocFilter";

  readonly transform = (estoc: Estoc): string =>
    `${estoc.almacen.nombre} - ${estoc.articulo.nombre} (${estoc.cantidad})`;
}
