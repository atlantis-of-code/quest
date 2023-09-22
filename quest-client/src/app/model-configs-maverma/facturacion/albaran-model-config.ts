import {
  AocGender,
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigFormResolver,
  AocModelConfigName,
} from "@atlantis-of-code/aoc-client/core/configs";
import { Albaran } from "../../models/facturacion/albaran";
import { DocumentoPipe } from "../../pipes/documento.pipe";
import { Injectable } from "@angular/core";
import { FacturaModelConfig } from "./factura-model-config";
import { AocUiToastMessageService } from "@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast";
import { AocModelId } from "@atlantis-of-code/aoc-client/core/models";
import { AocRestService } from "@atlantis-of-code/aoc-client/core/services";

@Injectable({ providedIn: "root" })
export class AlbaranModelConfig extends AocModelConfig<Albaran> {
  constructor(
    private documentoPipe: DocumentoPipe,
    private facturaModelConfig: FacturaModelConfig,
    private toastMessageService: AocUiToastMessageService,
    private aocRestService: AocRestService
  ) {
    super(Albaran);
  }

  readonly allow: AocModelConfigAllow = "all";

  // readonly form = ['facturacion', 'albaran', 'form'];
  readonly form = new AocModelConfigFormResolver<Albaran>(
    async (albaran: Albaran | AocModelId) => {
      if (typeof albaran === "string" || typeof albaran === "number") {
        albaran = await this.aocRestService.findOne(Albaran, {
          id: albaran as string,
        });
      }
      if (+albaran?.factura?.id > 0) {
        this.toastMessageService.showWarning(
          "El albarán está facturado, abriendo la factura correspondiente"
        );
        return {
          form: this.facturaModelConfig.form,
          modelOrId: albaran.factura.id,
        };
      } else {
        return {
          form: {
            loadComponent: () =>
              import(
                "../../modules/schemas/facturacion/albaran/albaran-form.component"
              ),
            aocUiWindowDynConfig: {
              width: 1280,
              height: 800,
            },
          },
          modelOrId: albaran?.id,
        };
      }
    }
  );

  readonly name: AocModelConfigName = {
    singular: "albarán",
    plural: "albaranes",
    gender: AocGender.Masculine,
  };

  readonly transform = (albaran: Albaran) => this.documentoPipe.transform(albaran);
}
