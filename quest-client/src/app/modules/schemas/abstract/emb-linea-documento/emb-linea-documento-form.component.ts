import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmbLineaDocumento } from '../../../../models/abstract/emb-linea-documento';
import {
  AocFormController,
  AocFormModule,
  AocFormTitleProvider
} from '@atlantis-of-code/aoc-client/components/aoc-form';
import { EmbLineaDocumentoModelConfig } from '../../../../model-configs/abstract/emb-linea-documento-model-config';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { Fichero } from '../../../../models/ficheros/fichero';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { FotoViewerComponent } from '../../ficheros/foto-viewer.component';

@Component({
  selector: 'app-emb-linea-documento-form',
  standalone: true,
  imports: [
    AocFormModule,
    AocUiFormModule,
    ReactiveFormsModule,
    FotoViewerComponent,
    AocUiInputTextModule
  ],
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [saveButtonWithTypeSubmit]="true"
      [newModelTitle]="newModelTitle"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Cantidad" [formControlName]="EmbLineaDocumentoClass.field.CANTIDAD">
            <input aocUiInputText aocUiFormField="Descuento" [formControlName]="EmbLineaDocumentoClass.field.DESCUENTO">
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-foto-viewer aocUiFormRowElement="" [fichero]="foto"></app-foto-viewer>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>

  `,
  providers: [AocFormController]
})
export default class EmbLineaDocumentoFormComponent implements OnInit {
  EmbLineaDocumentoClass = EmbLineaDocumento;

  newModelTitle: AocFormTitleProvider<EmbLineaDocumento> = (embLineaDocumento: EmbLineaDocumento) =>  {
    return `Cant. y Desc. '${this.articuloModelConfig.transform(embLineaDocumento.articulo)}'`;
  }

  foto: Fichero;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: EmbLineaDocumentoModelConfig,
    private fb: UntypedFormBuilder,
    private aocFormController: AocFormController<EmbLineaDocumento>,
    private articuloModelConfig: ArticuloModelConfig
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [EmbLineaDocumento.field.CANTIDAD]: ['0', [Validators.required, AocUiValidators.number()]],
      [EmbLineaDocumento.field.DESCUENTO]: ['0', AocUiValidators.numberInInterval(0, 100)]
    });
    this.gestionarAocFormController().then();
  }

  private async gestionarAocFormController() {
    const embLineaDocumento = await this.aocFormController.model();
    this.foto = embLineaDocumento.articulo.foto;
  }
}
