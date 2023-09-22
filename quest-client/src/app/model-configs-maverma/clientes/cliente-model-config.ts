import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName, AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';
import { Cliente } from "../../models/clientes/cliente";
import { Injectable } from "@angular/core";
import { DatosFiscalesPipe } from "../../pipes/datos-fiscales.pipe";

@Injectable({ providedIn: "root" })
export class ClienteModelConfig extends AocModelConfig<Cliente> {
  constructor(private datosFiscalesPipe: DatosFiscalesPipe) {
    super(Cliente);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/clientes/cliente/cliente-form.component"),
    aocUiWindowDynConfig: {
      width: 960,
      height: 800,
    },
  };

  readonly transform = (cliente) =>
    this.datosFiscalesPipe.transform(cliente.embDatosFiscales);

  readonly name: AocModelConfigName = {
    singular: "cliente",
    plural: "clientes",
    gender: AocGender.Masculine,
  };

  readonly payload: AocModelConfigServerPayload = {
    fnName: "clienteQueryBuilder",
    type: "query builder"
  };
}
