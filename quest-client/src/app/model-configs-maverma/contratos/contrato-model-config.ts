import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigServerPayload,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Contrato } from "../../models/contratos/contrato";
import { Injectable } from "@angular/core";
import { FechaPipe } from "../../pipes/fecha.pipe";
import { DatosFiscalesPipe } from "../../pipes/datos-fiscales.pipe";

@Injectable({ providedIn: "root" })
export class ContratoModelConfig extends AocModelConfig<Contrato> {
  constructor(
    private fechaPipe: FechaPipe,
    private datosFiscalesPipe: DatosFiscalesPipe
  ) {
    super(Contrato);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/contratos/contrato/contrato-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 1024,
      height: 800,
    },
  };

  readonly transform = (contrato: Contrato): string => {
    let datosCliente = "";
    if (!contrato.cliente.isMarkedAsRef()) {
      datosCliente = ` (${this.datosFiscalesPipe.transform(
        contrato.cliente.embDatosFiscales
      )})`;
    }
    return `${this.fechaPipe.transform(contrato.fecha_alta)} - Nº.${
      contrato.numero_poliza
    }${datosCliente}`;
  };

  readonly payload: AocModelConfigServerPayload = {
    fnName: "contratoFilter",
    type: "filter"
  };

  readonly name: AocModelConfigName = {
    singular: "contrato",
    plural: "contratos",
    gender: AocGender.Masculine,
  };
}
