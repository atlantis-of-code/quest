import { Component, OnInit } from '@angular/core';
import { DescuentoModelConfig } from '../../../../model-configs/contratos/descuento-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Descuento } from '../../../../models/contratos/descuento';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { BombonaSelectComponent } from '../../articulos/bombona/bombona-select.component';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-descuento-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <app-bombona-select aocUiFormField="Bombona" [span]="10"
                                [formControlName]="DescuentoClass.entity.BOMBONA"></app-bombona-select>
            <aoc-ui-datetime-picker aocUiFormField="Fecha inicio"
                                    [formControlName]="DescuentoClass.field.FECHA_INICIO"></aoc-ui-datetime-picker>
            <aoc-ui-datetime-picker aocUiFormField="Fecha fin"
                                    [formControlName]="DescuentoClass.field.FECHA_FIN"></aoc-ui-datetime-picker>
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Descuento máximo"
                   [formControlName]="DescuentoClass.field.DESCUENTO_MAXIMO">
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Descuento (€)"
                   [formControlName]="DescuentoClass.field.DESCUENTO_EUROS">
            <input aocUiInputText aocUiFormField="Descuento (%)"
                   [formControlName]="DescuentoClass.field.DESCUENTO_PORCENTAJE">
            <input aocUiInputText aocUiFormField="Porcentaje agencia"
                   [formControlName]="DescuentoClass.field.PORCENTAJE_AGENCIA">
            <input aocUiInputText aocUiFormField="Porcentaje repsol"
                   [formControlName]="DescuentoClass.field.PORCENTAJE_REPSOL">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    BombonaSelectComponent,
    AocUiDatetimePickerModule,
    ReactiveFormsModule,
    AocUiInputCheckboxModule,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class DescuentoFormComponent implements OnInit {
  DescuentoClass = Descuento;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Descuento> = {
    populate: {
      bombona: true
    }
  };

  constructor(
    public modelConfig: DescuentoModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Descuento.field.FECHA_INICIO]: [null, Validators.required],
      [Descuento.field.FECHA_FIN]: [null],
      [Descuento.field.DESCUENTO_EUROS]: [null, AocUiValidators.positiveNumber()],
      [Descuento.field.DESCUENTO_PORCENTAJE]: [null, AocUiValidators.numberInInterval(0, 100)],
      [Descuento.field.DESCUENTO_MAXIMO]: [null],
      [Descuento.field.PORCENTAJE_AGENCIA]: [null, AocUiValidators.numberInInterval(0, 100)],
      [Descuento.field.PORCENTAJE_REPSOL]: [null, AocUiValidators.numberInInterval(0, 100)],
      [Descuento.entity.BOMBONA]: [null, Validators.required]
    });
  }
}
