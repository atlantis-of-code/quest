import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormImport,
  AocModelConfigName,
  AocModelConfigPath,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Ticket } from "../../models/facturacion/ticket";
import { DocumentoPipe } from "../../pipes/documento.pipe";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TicketModelConfig extends AocModelConfig<Ticket> {
  constructor(private documentoPipe: DocumentoPipe) {
    super(Ticket);
  }

  readonly name: AocModelConfigName = {
    singular: "tíquet",
    plural: "tíquets",
    gender: AocGender.Masculine,
  };

  readonly allow: AocModelConfigAllow = "all";

  readonly form: AocModelConfigFormImport = {
    loadComponent: () =>
      import("../../modules/schemas/facturacion/ticket/ticket-form.component"),
    aocUiWindowDynConfig: {
      height: 800,
      width: 1280,
    },
  };

  readonly transform = (ticket: Ticket) => this.documentoPipe.transform(ticket);
}
