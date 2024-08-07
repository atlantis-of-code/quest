import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { BudgetModelConfig } from '../../../../model-configs/invoicing/budget-model-config';
import { Budget } from '../../../../models/invoicing/budget';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { FileGridFieldComponent } from '../../files/file-grid-field.component';
import {
  DocumentLineGridFieldComponent
} from '../../templates/document-line-template/document-line-grid-field.component';
import {
  DocumentTemplateSubformComponent
} from '../../templates/document-template/document-template-subform.component';
import { DocumentTemplateTotalsComponent } from '../../templates/document-template/document-template-totals.component';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiTabPanelModule,
    DocumentLineGridFieldComponent,
    DocumentTemplateSubformComponent,
    DocumentTemplateTotalsComponent,
    FileGridFieldComponent,
    ReactiveFormsModule
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Data">
            <aoc-ui-form-page>
              <app-document-template-subform seriesType="Budget"></app-document-template-subform>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-document-line-template-grid-field
                  aocUiFormField="Lines"
                  [formControlName]="$.collection.BUDGET_LINE"
                ></app-document-line-template-grid-field>
              </aoc-ui-form-row>
              <app-document-template-totals
                [formGroup]="formGroup"
                [linesFormControl]="formGroup.controls.budgetLineCollection"
              ></app-document-template-totals>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Files">
            <app-file-grid-field
              [fileParentClass]="$"
              fileDirectory="Delivery Notes"
              [formControlName]="$.collection.FILE"
            ></app-file-grid-field>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `
})
export default class BudgetFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected $ = Budget;
  protected modelConfig = inject(BudgetModelConfig);
  protected formGroup: FormGroup<AocFormGroupType<Budget>>;
  protected restOptions: AocRestOptions<Budget> = {
    populate: {
      customer: true,
      fiscalYear: true,
      series: true,
      budgetLineCollection: {
        item: {
          category: true,
          photo: true,
          tax: true
        },
        store: true,
        tax: true
      },
      fileCollection: true
    }
  };

  private questUtilsService = inject(QuestUtilsService);

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Budget>>({
      budgetLineCollection: new FormControl([]),
      fileCollection: new FormControl([])
    });
    this.questUtilsService.addControlsForDocumentTemplate('Budget', this.formGroup);
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 1400,
      height: 800
    };
  }
}
