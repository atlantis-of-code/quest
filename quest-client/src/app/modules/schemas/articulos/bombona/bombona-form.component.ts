import { Component, OnInit } from '@angular/core';
import { BombonaModelConfig } from '../../../../model-configs/articulos/bombona-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Bombona } from '../../../../models/articulos/bombona';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-bombona-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Código Mav." [formControlName]="BombonaClass.field.CODIGO_MAVERMA">
            <input aocUiInputText aocUiFormField="Código NACE" [formControlName]="BombonaClass.field.CODIGO_NACE">
            <input aocUiInputText aocUiFormField="Fianza" [formControlName]="BombonaClass.field.FIANZA">
            <input aocUiInputText aocUiFormField="Peso" [formControlName]="BombonaClass.field.PESO">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>

  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiInputTextModule,
    ReactiveFormsModule
  ],
  providers: [AocFormController]
})
export default class BombonaFormComponent implements OnInit {
  BombonaClass = Bombona;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: BombonaModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Bombona.field.CODIGO_MAVERMA]: [null, Validators.required],
      [Bombona.field.CODIGO_NACE]: [null],
      [Bombona.field.FIANZA]: ['0.00', [Validators.required, AocUiValidators.positiveNumber()]],
      [Bombona.field.PESO]: ['0.00', [Validators.required, AocUiValidators.positiveNumber()]]
    });
  }
}
