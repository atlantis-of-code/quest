import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { LineaTraspasoEstoc } from "../../models/articulos/linea-traspaso-estoc";
import { Injectable } from "@angular/core";
import { ArticuloModelConfig } from "./articulo-model-config";

@Injectable({ providedIn: "root" })
export class LineaTraspasoEstocModelConfig extends AocModelConfig<LineaTraspasoEstoc> {
  constructor(private articuloModelConfig: ArticuloModelConfig) {
    super(LineaTraspasoEstoc);
  }

  readonly name: AocModelConfigName = {
    singular: "línea de traspaso de estoc",
    plural: "líneas de traspaso de estoc",
    gender: AocGender.Feminine,
  };

  allow: AocModelConfigAllow = ["delete"];

  readonly transform = (lineaTraspasoEstoc: LineaTraspasoEstoc) => {
    return `${this.articuloModelConfig.transform(lineaTraspasoEstoc.articulo)} - ${
      lineaTraspasoEstoc.cantidad
    }`;
  };
}
