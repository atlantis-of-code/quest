import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { AnyoFiscal } from "../../models/common/anyo-fiscal";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AnyoFiscalModelConfig extends AocModelConfig<AnyoFiscal> {
  constructor() {
    super(AnyoFiscal);
  }

  readonly allow: AocModelConfigAllow = ["delete"];

  readonly name: AocModelConfigName = {
    gender: AocGender.Masculine,
    singular: "año fiscal",
    plural: "año fiscal",
  };

  readonly transform = (anyoFiscal: AnyoFiscal) =>
    `${anyoFiscal.anyo}${anyoFiscal.actual ? " (actual)" : ""}`;
}
