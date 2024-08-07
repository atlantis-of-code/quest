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
import { SeriesModelConfig } from '../../../../model-configs/common/series-model-config';
import { Series } from '../../../../models/common/series';

@Component({
  selector: 'app-series-form',
  standalone: true,
  providers: [ AocFormController ],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputCheckboxModule,
    AocUiInputTextModule,
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input type="checkbox" aocUiInputCheckbox [span]="6" [aocUiFormField]="SeriesClass.i18n.IS_DEFAULT" [formControlName]="SeriesClass.field.IS_DEFAULT">
            <input
              aocUiInputText
              [aocUiFormField]="SeriesClass.i18n.NAME + ' for ' + formGroup.controls.type.value + ' series'" [formControlName]="SeriesClass.field.NAME"
            >
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class SeriesFormComponent implements AocUiWindowDynConfigurable{
  protected SeriesClass = Series;
  protected modelConfig = inject(SeriesModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<Series>>({
    is_default: new FormControl(false, Validators.required),
    name: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 640,
      height: 150
    };
  }
}
