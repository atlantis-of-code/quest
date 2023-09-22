import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { LineaPresupuesto } from "../../models/facturacion/linea-presupuesto";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LineaPresupuestoModelConfig extends AocModelConfig<LineaPresupuesto> {
  constructor() {
    super(LineaPresupuesto);
  }

  readonly allow: AocModelConfigAllow = ["delete"];

  readonly name: AocModelConfigName = {
    singular: "línea de presupuesto",
    plural: "líneas de presupuesto",
    gender: AocGender.Feminine,
  };

  readonly transform = (lineaPresupuesto: LineaPresupuesto): string => {
    return `${lineaPresupuesto.codigo_articulo} - ${lineaPresupuesto.nombre_articulo}`;
  };
}
