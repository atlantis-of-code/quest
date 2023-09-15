import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { TipoDocumento } from "../../models/common/tipo-documento";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TipoDocumentoModelConfig extends AocModelConfig<TipoDocumento> {
  constructor() {
    super(TipoDocumento);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/common/tipo-documento/tipo-documento-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 320,
      height: 180,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "tipo de documento",
    plural: "tipos de documento",
    gender: AocGender.Masculine,
  };

  readonly transform = (tipoDocumento) => tipoDocumento.nombre;
}
