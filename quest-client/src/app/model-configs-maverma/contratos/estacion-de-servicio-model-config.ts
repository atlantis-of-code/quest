import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';
import { EstacionDeServicio } from "../../models/contratos/estacion-de-servicio";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class EstacionDeServicioModelConfig extends AocModelConfig<EstacionDeServicio> {
  constructor() {
    super(EstacionDeServicio);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form = ["contratos", "estacion-de-servicio", "form"];

  readonly name: AocModelConfigName = {
    singular: "estación de servicio",
    plural: "estaciones de servicio",
    gender: AocGender.Feminine,
  };

  readonly payload: AocModelConfigServerPayload = {
    fnName: "estacionDeServicioFilter",
    type: "filter"
  };

  readonly transform = (estacionDeServicio: EstacionDeServicio): string => {
    return `${estacionDeServicio.codigo} - ${estacionDeServicio.nombre}`;
  };
}
