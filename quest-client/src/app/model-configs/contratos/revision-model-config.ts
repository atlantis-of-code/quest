import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Revision } from "../../models/contratos/revision";
import { FechaPipe } from "../../pipes/fecha.pipe";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RevisionModelConfig extends AocModelConfig<Revision> {
  constructor(private fechaPipe: FechaPipe) {
    super(Revision);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/contratos/revision/revision-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 640,
      height: 230,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "revisión",
    plural: "revisiones",
    gender: AocGender.Feminine,
  };

  readonly transform = (revision) =>
    `Revisión contrato ${
      revision.contrato.numero_poliza
    } de ${this.fechaPipe.transform(revision.fecha)}`;
}
