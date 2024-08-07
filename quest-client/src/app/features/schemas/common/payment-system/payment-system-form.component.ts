import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { PaymentSystemModelConfig } from '../../../../model-configs/common/payment-system-model-config';
import { PaymentSystem } from '../../../../models/common/payment-system';

@Component({
  selector: 'app-payment-system-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputCheckboxModule,
    AocUiInputTextModule
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Default" [formControlName]="$.field.IS_DEFAULT" [span]="8">
            <input aocUiInputText aocUiFormField="Name" [formControlName]="$.field.NAME">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class PaymentSystemFormComponent implements AocUiWindowDynConfigurable {
  protected $ = PaymentSystem;

  protected modelConfig = inject(PaymentSystemModelConfig);

  protected formGroup = new FormGroup<AocFormGroupType<PaymentSystem>>({
    name: new FormControl(null, Validators.required),
    is_default: new FormControl(false, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 320,
      height: 150
    }
  }
}
