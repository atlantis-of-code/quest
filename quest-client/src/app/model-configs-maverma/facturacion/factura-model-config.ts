import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Factura } from "../../models/facturacion/factura";
import { DocumentoPipe } from "../../pipes/documento.pipe";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FacturaModelConfig extends AocModelConfig<Factura> {
  constructor(private documentoPipe: DocumentoPipe) {
    super(Factura);
  }

  readonly name: AocModelConfigName = {
    singular: "factura",
    plural: "facturas",
    gender: AocGender.Feminine,
  };

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/facturacion/factura/factura-form.component"
      ),
    aocUiWindowDynConfig: {
      height: 800,
      width: 1280,
    },
  };

  readonly transform = (factura: Factura) => this.documentoPipe.transform(factura);
}
