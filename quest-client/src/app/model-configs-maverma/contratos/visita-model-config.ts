import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Visita } from "../../models/contratos/visita";
import { FechaPipe } from "../../pipes/fecha.pipe";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class VisitaModelConfig extends AocModelConfig<Visita> {
  constructor(private fechaPipe: FechaPipe) {
    super(Visita);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/contratos/visita/visita-form.component"),
    aocUiWindowDynConfig: {
      width: 800,
      height: 160,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "visita",
    plural: "visitas",
    gender: AocGender.Feminine,
  };

  readonly transform = (visita) => `${this.fechaPipe.transform(visita.fecha)}`;
}
