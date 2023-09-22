import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { ContratoBombona } from "../../models/contratos/contrato-bombona";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ContratoBombonaModelConfig extends AocModelConfig<ContratoBombona> {
  constructor() {
    super(ContratoBombona);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly name: AocModelConfigName = {
    singular: "bombona en contrato",
    plural: "bombonas en contrato",
    gender: AocGender.Feminine,
  };

  readonly transform = (contratoBombona: ContratoBombona): string => {
    return `${contratoBombona.contrato.numero_poliza} - ${contratoBombona.bombona.codigo_nace} (${contratoBombona.bombona.codigo_maverma})`;
  };
}
