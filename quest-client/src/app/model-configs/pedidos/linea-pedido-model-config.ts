import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { LineaPedido } from "../../models/pedidos/linea-pedido";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LineaPedidoModelConfig extends AocModelConfig<LineaPedido> {
  constructor() {
    super(LineaPedido);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly name: AocModelConfigName = {
    singular: "línea de pedido",
    plural: "líneas de pedido",
    gender: AocGender.Feminine,
  };

  readonly transform = (lineaPedido) =>
    `${lineaPedido.bombona.codigo_maverma} (${lineaPedido.bombona.codigo_nace}) - ${lineaPedido.cantidad}uds.`;
}
