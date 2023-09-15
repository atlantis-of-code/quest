import { Component, OnInit } from '@angular/core';
import { TipoDocumentoModelConfig } from '../../../../model-configs/common/tipo-documento-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoDocumento } from '../../../../models/common/tipo-documento';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-tipo-documento-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre del tipo de documento"
                   [formControlName]="TipoDocumentoClass.field.NOMBRE">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class TipoDocumentoFormComponent implements OnInit {
  TipoDocumentoClass = TipoDocumento;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: TipoDocumentoModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [TipoDocumento.field.NOMBRE]: [undefined, Validators.required]
    });
  }
}
