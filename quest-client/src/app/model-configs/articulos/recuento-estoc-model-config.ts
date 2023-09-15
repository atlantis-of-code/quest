import { Injectable } from "@angular/core";
import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { RecuentoEstoc } from "../../models/articulos/recuento-estoc";
import { FechaPipe } from "../../pipes/fecha.pipe";

@Injectable({ providedIn: "root" })
export class RecuentoEstocModelConfig extends AocModelConfig<RecuentoEstoc> {
  constructor(private fechaPipe: FechaPipe) {
    super(RecuentoEstoc);
  }

  readonly name: AocModelConfigName = {
    gender: AocGender.Masculine,
    plural: "recuentos de estoc",
    singular: "recuento de estoc",
  };

  allow: AocModelConfigAllow = ["delete"];

  readonly transform = (recuentoEstoc: RecuentoEstoc): string => {
    return this.fechaPipe.transform(recuentoEstoc.fecha);
  };
}
