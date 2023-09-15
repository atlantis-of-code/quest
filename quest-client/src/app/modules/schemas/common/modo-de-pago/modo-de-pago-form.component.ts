import { Component, OnInit } from '@angular/core';
import { ModoDePagoModelConfig } from '../../../../model-configs/common/modo-de-pago-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModoDePago } from '../../../../models/common/modo-de-pago';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-modo-de-pago-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiValueAsNumber aocUiFormField="Código Nace" [span]="8"
                   [formControlName]="ModoDePagoClass.field.CODIGO_NACE">
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="ModoDePagoClass.field.NOMBRE">
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
export default class ModoDePagoFormComponent implements OnInit {
  ModoDePagoClass = ModoDePago;
  formGroup: UntypedFormGroup;
  constructor(
    protected modelConfig: ModoDePagoModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      [ModoDePago.field.CODIGO_NACE]: [null, AocUiValidators.positiveNumber(0)],
      [ModoDePago.field.NOMBRE]: [null, Validators.required]
    });
  }
}
