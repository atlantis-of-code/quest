import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
} from "@atlantis-of-code/aoc-client/core/configs";
import { TraspasoEstoc } from "../../models/articulos/traspaso-estoc";
import { FechaPipe } from "../../pipes/fecha.pipe";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TraspasoEstocModelConfig extends AocModelConfig<TraspasoEstoc> {
  constructor(private fechaPipe: FechaPipe) {
    super(TraspasoEstoc);
  }

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/articulos/traspaso-estoc/traspaso-estoc-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 800,
      height: 640,
    },
  };

  readonly allow: AocModelConfigAllow = "all";

  readonly name: AocModelConfigName = {
    singular: "traspaso de estoc",
    plural: "traspasos de estoc",
    gender: AocGender.Masculine,
  };

  readonly transform = (t) =>
    `Traspaso de ${t.almacenOrigen.nombre} a ${
      t.almacenDestino.nombre
    } con fecha ${this.fechaPipe.transform(t.fecha)}`;
}
