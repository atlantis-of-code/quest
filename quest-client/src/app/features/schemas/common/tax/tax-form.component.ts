import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { TaxModelConfig } from '../../../../model-configs/common/tax-model-config';
import { Tax } from '../../../../models/common/tax';

@Component({
  selector: 'app-tax-form',
  standalone: true,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    AocUiInputCheckboxModule
  ],
  providers: [ AocFormController ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Is default" [formControlName]="$.field.IS_DEFAULT"
                   [span]="6">
            <input aocUiInputText aocUiFormField="Name" [formControlName]="$.field.NAME">
            <input aocUiInputText aocUiFormField="Percent" [formControlName]="$.field.PERCENT">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class TaxFormComponent implements AocUiWindowDynConfigurable {
  protected $ = Tax;
  protected modelConfig = inject(TaxModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<Tax>>({
    is_default: new FormControl(false, Validators.required),
    name: new FormControl(null, Validators.required),
    percent: new FormControl('0', [Validators.required, AocUiValidators.numberInInterval(0, 100, 2)])
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 480,
      height: 150
    };
  }
}
