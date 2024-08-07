import { Component, inject, OnInit } from '@angular/core';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocTabConfigurable, AocTabConfigurableParams } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { of } from 'rxjs';
import { BudgetModelConfig } from '../../../../model-configs/invoicing/budget-model-config';
import { Budget } from '../../../../models/invoicing/budget';
import { BudgetGridComponent } from './budget-grid.component';

@Component({
  selector: 'app-budget-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    BudgetGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="budgetModelConfig"
      [masterModelEmitter]="budgetModelEmitter"
      [detailWidthPercent]="40"
    >
      <ng-template aocMaster>
        <app-budget-grid [modelEmitter]="budgetModelEmitter"></app-budget-grid>
      </ng-template>
      <ng-template aocDetail tabName="Preview">
        <!--
            TODO: show PDF preview, currentBudget can be used (or its url)
        -->
      </ng-template>
    </aoc-master-detail>
  `
})
export default class BudgetPanelComponent implements OnInit, AocTabConfigurable {
  protected budgetModelConfig = inject(BudgetModelConfig);

  @AocUnsubscribe
  protected budgetModelEmitter = new AocModelEmitter<Budget>();

  // TODO: can be passed to pdf document preview. Warning, can be undefined
  protected currentBudget: Budget;

  ngOnInit() {
    this.budgetModelEmitter.model$.subscribe(budget => this.currentBudget = budget);
  }

  createAocTabConfig(params?: AocTabConfigurableParams): AocTabConfig {
    return  {
      title: of('Budgets')
    }
  }
}
