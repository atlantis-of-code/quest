import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Categoria } from "../../models/articulos/categoria";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CategoriaModelConfig extends AocModelConfig<Categoria> {
  constructor() {
    super(Categoria);
  }

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/articulos/categoria/categoria-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 480,
      height: 160,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "categoría",
    plural: "categorías",
    gender: AocGender.Feminine,
  };

  readonly transform = (categoria: Categoria): string => categoria.nombre;
}
