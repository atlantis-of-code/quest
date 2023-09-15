import {
  AocGender,
  AocModelConfig,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { MovimientoEstoc } from "../../models/articulos/movimiento-estoc";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MovimientoEstocModelConfig extends AocModelConfig<MovimientoEstoc> {
  constructor() {
    super(MovimientoEstoc);
  }

  readonly name: AocModelConfigName = {
    singular: "movimiento de estoc",
    plural: "movimientos de estoc",
    gender: AocGender.Masculine,
  };

  readonly transform = (movimientoEstoc: MovimientoEstoc): string => {
    return `${movimientoEstoc.tipo}: ${movimientoEstoc.articulo.nombre} en ${movimientoEstoc.almacen.nombre} (${movimientoEstoc.cantidad})`;
  };
}
