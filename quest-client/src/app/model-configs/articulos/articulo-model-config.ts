import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigServerPayload,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Articulo } from "../../models/articulos/articulo";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ArticuloModelConfig extends AocModelConfig<Articulo> {
  constructor() {
    super(Articulo);
  }

  readonly allow: AocModelConfigAllow = "all";

  form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/articulos/articulo/articulo-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 800,
      height: 640,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "artículo",
    plural: "artículos",
    gender: AocGender.Masculine,
  };

  readonly payload: AocModelConfigServerPayload = {
    fnName: "articuloFilter",
    type: "filter",
  };

  readonly transform = (articulo: Articulo): string =>
    `${articulo.codigo} - ${articulo.nombre}`;
}
