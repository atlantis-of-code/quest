import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { EmbLineaDocumento } from "../../models/abstract/emb-linea-documento";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EmbLineaDocumentoModelConfig extends AocModelConfig<EmbLineaDocumento> {
  constructor() {
    super(EmbLineaDocumento);
  }

  readonly name: AocModelConfigName = {
    gender: AocGender.Feminine,
    plural: "Líneas de documento",
    singular: "Línea de documento",
  };

  readonly allow: AocModelConfigAllow = "add";

  readonly transform = (embLineaDocumento: EmbLineaDocumento) => {
    return `${embLineaDocumento.codigo_articulo}`;
  };
}
