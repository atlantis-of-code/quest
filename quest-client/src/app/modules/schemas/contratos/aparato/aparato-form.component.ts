import { Component, OnInit } from '@angular/core';
import { AparatoModelConfig } from '../../../../model-configs/contratos/aparato-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Aparato } from '../../../../models/contratos/aparato';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-aparato-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiValueAsNumber aocUiFormField="Año" [span]="4"
                   [formControlName]="AparatoClass.field.ANYO">
            <input aocUiInputText aocUiFormField="Tipo" [formControlName]="AparatoClass.field.TIPO">
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Marca" [formControlName]="AparatoClass.field.MARCA">
            <input aocUiInputText aocUiFormField="Modelo" [formControlName]="AparatoClass.field.MODELO">
            <input aocUiInputText aocUiFormField="Potencia" [span]="4" [formControlName]="AparatoClass.field.POTENCIA">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    ReactiveFormsModule,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class AparatoFormComponent implements OnInit {
  AparatoClass = Aparato;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: AparatoModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Aparato.field.ANYO]: [null, AocUiValidators.positiveNumber(0)],
      [Aparato.field.TIPO]: [null],
      [Aparato.field.MARCA]: [null, Validators.required],
      [Aparato.field.MODELO]: [null],
      [Aparato.field.POTENCIA]: ['0.00', AocUiValidators.positiveNumber(2)]
    });
  }
}
