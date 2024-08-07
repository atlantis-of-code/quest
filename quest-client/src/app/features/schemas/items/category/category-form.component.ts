import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { CategoryModelConfig } from '../../../../model-configs/items/category-model-config';
import { Category } from '../../../../models/items/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule
  ],
  providers: [ AocFormController ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Name" [formControlName]="$.field.NAME">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class CategoryFormComponent implements AocUiWindowDynConfigurable {
  protected $ = Category;
  protected modelConfig = inject(CategoryModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<Category>>({
    name: new FormControl(null, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 480,
      height: 150
    };
  }
}
