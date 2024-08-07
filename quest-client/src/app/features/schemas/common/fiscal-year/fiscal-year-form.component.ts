import { Component, inject, OnInit } from '@angular/core';
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
import { getYear } from 'date-fns';
import { FiscalYearModelConfig } from '../../../../model-configs/common/fiscal-year-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';
import { QuestDefaultsService } from '../../../../services/quest-defaults-service';

@Component({
  selector: 'app-fiscal-year-form',
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
            <input type="checkbox" aocUiInputCheckbox [span]="6" [aocUiFormField]="$.i18n.IS_CURRENT" [formControlName]="$.field.IS_CURRENT">
            <input aocUiInputText [aocUiFormField]="$.i18n.YEAR" [formControlName]="$.field.YEAR">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class FiscalYearFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected $ = FiscalYear
  protected modelConfig = inject(FiscalYearModelConfig);
  protected formGroup: FormGroup<AocFormGroupType<FiscalYear>>;

  private questDefaultsService = inject(QuestDefaultsService);

  ngOnInit() {
    let nextYear: number;
    if (this.questDefaultsService.$fiscalYear) {
      nextYear = this.questDefaultsService.$fiscalYear.year + 1;
    } else {
      nextYear = getYear(new Date());
    }
    this.formGroup = new FormGroup<AocFormGroupType<FiscalYear>>({
      is_current: new FormControl(false, Validators.required),
      year: new FormControl(nextYear, [Validators.required, AocUiValidators.positiveNumber(0), Validators.min(1900)])
    });
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 480,
      height: 150
    };
  }
}
