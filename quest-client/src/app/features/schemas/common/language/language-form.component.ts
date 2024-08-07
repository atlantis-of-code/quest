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
import { LanguageModelConfig } from '../../../../model-configs/common/language-model-config';
import { Language } from '../../../../models/common/language';

@Component({
  selector: 'app-country-form',
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
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Default" [formControlName]="$.field.IS_DEFAULT"
                   [span]="4">
            <input aocUiInputText aocUiFormField="Name" [formControlName]="$.field.NAME">
            <input aocUiInputText aocUiFormField="Iso Code 2" [formControlName]="$.field.ISO_CODE2">
            <input aocUiInputText aocUiFormField="Iso Code 3" [formControlName]="$.field.ISO_CODE3">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class LanguageFormComponent implements AocUiWindowDynConfigurable {
  protected $ = Language;
  protected modelConfig = inject(LanguageModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<Language>>({
    is_default: new FormControl(false, Validators.required),
    name: new FormControl(null, Validators.required),
    iso_code2: new FormControl(null, Validators.required),
    iso_code3: new FormControl(null, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 720,
      height: 150
    };
  }
}
