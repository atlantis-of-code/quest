import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Fichero } from "../../models/ficheros/fichero";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FicheroModelConfig extends AocModelConfig<Fichero> {
  constructor() {
    super(Fichero);
  }

  readonly name: AocModelConfigName = {
    singular: "fichero",
    plural: "ficheros",
    gender: AocGender.Masculine,
  };

  readonly allow: AocModelConfigAllow = "all";

  readonly transform = (fichero) => fichero.nombre;
}
