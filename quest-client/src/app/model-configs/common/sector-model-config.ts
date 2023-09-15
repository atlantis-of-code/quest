import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
  AocModelConfigSocketExtraSubscriptions,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Sector } from "../../models/common/sector";
import { Subsector } from "../../models/common/subsector";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class SectorModelConfig extends AocModelConfig<Sector> {
  constructor() {
    super(Sector);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly socketExtraSubscriptions: AocModelConfigSocketExtraSubscriptions = [
    Subsector,
  ];

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/common/sector/sector-form.component"),
    aocUiWindowDynConfig: {
      height: 640,
      width: 320,
    },
  };

  readonly name: AocModelConfigName = {
    gender: AocGender.Masculine,
    singular: "sector",
    plural: "sectores",
  };

  readonly transform = (sector: Sector): string => sector.nombre;
}
