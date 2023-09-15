import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Contacto } from "../../models/contactos/contacto";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ContactoModelConfig extends AocModelConfig<Contacto> {
  constructor() {
    super(Contacto);
  }

  readonly allow: AocModelConfigAllow = "all";

  //readonly form = ['contactos', 'contacto', 'form'];
  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import(
        "../../modules/schemas/contactos/contacto/contacto-form.component"
      ),
    aocUiWindowDynConfig: {
      width: 640,
      height: 230,
    },
  };

  readonly name: AocModelConfigName = {
    singular: "contacto",
    plural: "contactos",
    gender: AocGender.Masculine,
  };

  readonly transform = (model: Contacto): string => model.nombre;
}
