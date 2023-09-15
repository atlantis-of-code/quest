import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Subsector } from "../../models/common/subsector";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SubsectorModelConfig extends AocModelConfig<Subsector> {
  constructor() {
    super(Subsector);
  }

  readonly allow: AocModelConfigAllow = "none";

  readonly name: AocModelConfigName = {
    gender: AocGender.Masculine,
    singular: "subsector",
    plural: "subsectores",
  };

  readonly transform = (subsector) => subsector.nombre;
}
