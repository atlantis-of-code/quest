import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Repartidor } from "../../models/pedidos/repartidor";
import { Injectable } from "@angular/core";
import { DatosFiscalesPipe } from "../../pipes/datos-fiscales.pipe";

@Injectable({
  providedIn: "root",
})
export class RepartidorModelConfig extends AocModelConfig<Repartidor> {
  constructor(private datosFiscalesPipe: DatosFiscalesPipe) {
    super(Repartidor);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/pedidos/repartidor/repartidor-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 860,
      height: 640,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "repartidor",
    plural: "repartidores",
    gender: AocGender.Masculine,
  };

  readonly transform = (repartidor) =>
    this.datosFiscalesPipe.transform(repartidor);
}
