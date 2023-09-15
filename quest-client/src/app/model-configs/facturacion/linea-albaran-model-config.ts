import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { LineaAlbaran } from "../../models/facturacion/linea-albaran";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LineaAlbaranModelConfig extends AocModelConfig<LineaAlbaran> {
  constructor() {
    super(LineaAlbaran);
  }

  readonly allow: AocModelConfigAllow = ["delete"];

  readonly name: AocModelConfigName = {
    singular: "línea de albarán",
    plural: "líneas de albarán",
    gender: AocGender.Feminine,
  };

  readonly transform = (lineaPresupuesto: LineaAlbaran): string => {
    return `${lineaPresupuesto.codigo_articulo} - ${lineaPresupuesto.nombre_articulo}`;
  };
}
