import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Presupuesto } from "../../models/facturacion/presupuesto";
import { DocumentoPipe } from "../../pipes/documento.pipe";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PresupuestoModelConfig extends AocModelConfig<Presupuesto> {
  constructor(private documentoPipe: DocumentoPipe) {
    super(Presupuesto);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/facturacion/presupuesto/presupuesto-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 1280,
      height: 800,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "presupuesto",
    plural: "presupuestos",
    gender: AocGender.Masculine,
  };

  readonly transform = (presupuesto: Presupuesto) => this.documentoPipe.transform(presupuesto);
}
