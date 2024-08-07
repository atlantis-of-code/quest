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
import { StoreModelConfig } from '../../../../model-configs/items/store-model-config';
import { Store } from '../../../../models/items/store';

@Component({
  selector: 'app-store-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    AocUiInputCheckboxModule
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input type="checkbox" aocUiInputCheckbox [span]="6" [aocUiFormField]="$.i18n.IS_DEFAULT" [formControlName]="$.field.IS_DEFAULT">
            <input aocUiInputText [aocUiFormField]="$.i18n.NAME" [formControlName]="$.field.NAME">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class StoreFormComponent implements AocUiWindowDynConfigurable {
  protected $ = Store;
  protected modelConfig = inject(StoreModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<Store>>({
    is_default: new FormControl(false, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 480,
      height: 150
    };
  }
}
