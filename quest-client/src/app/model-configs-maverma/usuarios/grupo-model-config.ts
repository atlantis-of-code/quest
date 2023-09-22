import { Injectable } from "@angular/core";
import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Grupo } from "../../models/usuarios/grupo";

@Injectable({ providedIn: "root" })
export class GrupoModelConfig extends AocModelConfig<Grupo> {
  constructor() {
    super(Grupo);
  }

  readonly name: AocModelConfigName = {
    singular: "grupo",
    plural: "grupos",
    gender: AocGender.Masculine,
  };

  readonly transform = (grupo) => grupo.nombre;
}
