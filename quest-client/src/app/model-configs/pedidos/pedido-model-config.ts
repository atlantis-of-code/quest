import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';
import { Pedido } from "../../models/pedidos/pedido";
import { FechaPipe } from "../../pipes/fecha.pipe";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PedidoModelConfig extends AocModelConfig<Pedido> {
  constructor(private fechaPipe: FechaPipe) {
    super(Pedido);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly name: AocModelConfigName = {
    singular: "pedido",
    plural: "pedidos",
    gender: AocGender.Masculine,
  };

  readonly payload: AocModelConfigServerPayload = {
    fnName: "pedidoQueryBuilder",
    type: "query builder"
  };

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/pedidos/pedido/pedido-form.component"),
    aocUiWindowDynConfig: {
      width: 1400,
      height: 800,
    },
  };

  readonly transform = (pedido) =>
    `pedido de contrato ${
      pedido.contrato.numero_poliza
    } a ${this.fechaPipe.transform(pedido.fecha_creacion)}`;
}
