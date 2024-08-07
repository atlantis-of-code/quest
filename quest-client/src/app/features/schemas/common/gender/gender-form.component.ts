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
import { GenderModelConfig } from '../../../../model-configs/common/gender-model-config';
import { Gender } from '../../../../models/common/gender';

@Component({
  selector: 'app-gender-form',
  standalone: true,
  providers: [ AocFormController ],
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
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Default" [formControlName]="GenderClass.field.IS_DEFAULT" [span]="6">
            <input aocUiInputText aocUiFormField="Name" [formControlName]="GenderClass.field.NAME">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class GenderFormComponent implements AocUiWindowDynConfigurable {
  protected GenderClass = Gender;
  protected modelConfig = inject(GenderModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<Gender>>({
    is_default: new FormControl(false, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 520,
      height: 150
    };
  }
}
