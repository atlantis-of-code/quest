import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Empresa } from "../../models/configuracion/empresa";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class EmpresaModelConfig extends AocModelConfig<Empresa> {
  constructor() {
    super(Empresa);
  }

  readonly allow: AocModelConfigAllow = ["edit"];

  readonly form = ["configuracion", "empresa", "form"];

  readonly name: AocModelConfigName = {
    singular: "empresa",
    plural: "empresas",
    gender: AocGender.Feminine,
  };

  readonly transform = (empresa): string =>
    `${empresa.embDatosFiscales.nombre_fiscal}`;
}
