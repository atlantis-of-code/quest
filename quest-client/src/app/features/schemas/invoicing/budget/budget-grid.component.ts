import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter, AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { BudgetModelConfig } from '../../../../model-configs/invoicing/budget-model-config';
import { DeliveryNoteModelConfig } from '../../../../model-configs/invoicing/delivery-note-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';
import { Customer } from '../../../../models/customers/customer';
import { Budget } from '../../../../models/invoicing/budget';
import { BudgetLine } from '../../../../models/invoicing/budget-line';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { StockLine } from '../../../../models/invoicing/stock-line';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestDocumentPipe } from '../../../../pipes/quest-document.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';
import { QuestDefaultsService } from '../../../../services/quest-defaults-service';
import { QuestUtilsService } from '../../../../services/quest-utils.service';

@Component({
  selector: 'app-budget-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiButtonModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [modelEmitter]="modelEmitter"
      [modelListener]="modelListener"
      (selectionChange)="selected = $event"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Create delivery note from selected"
            [disabled]="selected.length === 0"
            (click)="createDeliveryNote()"
          ></button>
        </aoc-ui-item>
      </ng-template>
    </aoc-grid>
  `
})
export class BudgetGridComponent implements OnInit {
  @Input() modelEmitter: AocModelEmitter<Budget>;
  @Input() modelListener: AocModelListener<Budget>;
  protected modelConfig = inject(BudgetModelConfig);
  protected columns: AocGridColumn<Budget>[];
  protected restOptions: AocRestOptions<Budget> = {
    populate: {
      fiscalYear: true,
      series: true,
      customer: true
    }
  };
  protected selected: Budget[] = [];

  private questDatePipe = inject(QuestDatePipe);
  private questPricePipe = inject(QuestPricePipe);
  private questDocumentPipe = inject(QuestDocumentPipe);
  private questDefaultsService = inject(QuestDefaultsService);
  private questUtilsService = inject(QuestUtilsService);
  private customerModelConfig = inject(CustomerModelConfig);
  private aocUiToastMessageService = inject(AocUiToastMessageService);
  private aocRestService = inject(AocRestService);
  private aocFormWindowService = inject(AocFormWindowService);
  private deliveryNoteModelConfig = inject(DeliveryNoteModelConfig);
  private router = inject(Router);

  ngOnInit() {
    this.columns = [
      {
        header: 'Fiscal year',
        display: [ Budget.entity.FISCAL_YEAR, FiscalYear.field.YEAR ],
        align: 'right',
        size: '8rem'
      },
      {
        header: 'Date',
        display: [ Budget.field.DATE, this.questDatePipe ],
        size: '7rem',
        defaultSort: 'desc'
      },
      {
        header: 'Series/number',
        display: (b: Budget) => this.questDocumentPipe.transform(b, false),
        orderBy: {
          series: { name: 'auto' },
          number: 'auto'
        },
        size: '9rem',
        align: 'center'
      }
    ];
    if (!this.modelListener) {
      this.columns = this.columns.concat([
        {
          header: 'Customer',
          display: [ Budget.entity.CUSTOMER, this.customerModelConfig ]
        }
      ]);
    }
    this.columns = this.columns.concat([
      {
        header: 'Total base',
        display: [ Budget.field.TOTAL_BASE, this.questPricePipe ],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Total taxes',
        display: [ Budget.field.TOTAL_TAXES, this.questPricePipe ],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Total',
        display: [ Budget.field.TOTAL, this.questPricePipe ],
        size: '8rem',
        align: 'right',
        ngStyle: { fontWeight: 'bold' }
      }
    ]);
  }

  protected async createDeliveryNote() {
    const customer: Customer = this.selected[0].customer;
    if (this.selected.some(budget => budget.customer.id !== customer.id)) {
      this.aocUiToastMessageService.showError('There are mixed customers. Budgets must all be from the same customer.');
      return;
    }
    const deliveryNote = new DeliveryNote();
    deliveryNote.customer = customer;
    deliveryNote.series = this.questDefaultsService.seriesForDeliverynote;
    deliveryNote.fiscalYear = this.questDefaultsService.fiscalYear;
    deliveryNote.stockLineLineCollection = [];
    const observations: string[] = [];
    for (const budget of this.selected.sort((b1, b2) => b1.date.getTime() - b2.date.getTime())) {
      observations.push(`'${this.questDocumentPipe.transform(budget)}'`);
    }
    deliveryNote.observations = `Created from budgets ${observations.join(', ')}`;
    // We should get the lines of all budgets sorted by budget date and order
    const budgetLines = await this.aocRestService.find(
      BudgetLine,
      { budget: { id: { $in: this.selected.map(budget => budget.id) }}},
      {
        orderBy: { budget: { date: 'asc'}, order: 'asc' },
        populate: { item: true, tax: true }
      }
    );
    let order = 1;
    for (const budgetLine of budgetLines) {
      const line = new StockLine();
      line.order = order++;
      line.item = budgetLine.item;
      line.tax = budgetLine.tax;
      line.base_price = budgetLine.base_price;
      line.discount = budgetLine.discount;
      line.quantity = budgetLine.quantity;
      line.total_base = budgetLine.total_base;
      line.item_code = budgetLine.item_code;
      line.item_name = budgetLine.item_name;
      line.store = this.questDefaultsService.store;
      deliveryNote.stockLineLineCollection.push(line);
    }
    const calculations = this.questUtilsService.calculateDocumentTotals(deliveryNote.stockLineLineCollection);
    deliveryNote.total_base = calculations.total_base;
    deliveryNote.total_taxes = calculations.total_taxes;
    deliveryNote.total = calculations.total;
    const result = await this.aocFormWindowService.openUsingModelConfig({
      modelConfig: this.deliveryNoteModelConfig,
      aocFormConfig: {
        persistToDatabase: true,
        loadFromDatabase: false,
        modelOrId: deliveryNote
      }
    });
    if (result.type === 'save') {
      await this.router.navigate(['invoicing', 'delivery-note', 'panel']);
    }
  }
}
