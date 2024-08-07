import { NgIf } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocFormWindowService } from '@atlantis-of-code/aoc-client/core/services';
import {
  AocGridColumn,
  AocGridFieldModelEvent,
  AocGridGroupConfig,
  aocGridGroupDisplay
} from '@atlantis-of-code/aoc-client/core/types';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputGroupModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-group';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AocUiWindowDynConfig, AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import Big from 'big.js';
import { Subscription } from 'rxjs';
import { TaxModelConfig } from '../../../../model-configs/common/tax-model-config';
import { ItemModelConfig } from '../../../../model-configs/items/item-model-config';
import {
  DocumentLineTemplateModelConfig
} from '../../../../model-configs/templates/document-line-template-model-config';
import { Item } from '../../../../models/items/item';
import { Store } from '../../../../models/items/store';
import { DocumentLineTemplate } from '../../../../models/templates/document-line-template';
import { QuestPercentPipe } from '../../../../pipes/quest-percent.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';
import { QuestDefaultsService } from '../../../../services/quest-defaults-service';
import { TaxAutocompleteComponent } from '../../common/tax/tax-autocomplete.component';
import { ItemAutocompleteComponent } from '../../items/item/item-autocomplete.component';
import { StoreAutocompleteComponent } from '../../items/store/store-autocomplete.component';

@Component({
  selector: 'app-document-line-template-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiTooltipModule,
    NgIf,
    ReactiveFormsModule,
    AocUiInputTextModule,
    AocUiToolbarModule,
    ItemAutocompleteComponent,
    AocUiButtonModule,
    AocUiItemModule,
    AocUiInputCheckboxModule,
    AocUiVerticalSeparatorModule,
    TaxAutocompleteComponent,
    StoreAutocompleteComponent,
    AocUiInputGroupModule
  ],
  template: `
    <aoc-grid-field [modelConfig]="modelConfig" [columns]="columns" (modelChange)="modelChange($event)" [sortField]="$.field.ORDER" sortDir="asc" [groupConfig]="groupConfig">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <app-item-autocomplete
            [formControl]="newItemControl"
            style="width: 35rem"
            allow="add"
            [loadCategory]="true"
            [loadPhoto]="true"
            placeholder="Add new lines by choosing a new item..."
            #itemAutocompleteComponent
          ></app-item-autocomplete>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          <button aocUiButton label="Add empty row" icon="add_box" (click)="handleNewLine()"></button>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item label="Use store" *ngIf="handleStores">
          <aoc-ui-input-group>
            <app-store-autocomplete [formControl]="storeControl" allow="none"></app-store-autocomplete>
            <button aocUiButton label="Set to all lines" icon="checklist" (click)="setCurrentStoreToAllLines()"></button>
          </aoc-ui-input-group>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Group by category" [formControl]="groupByCategoryControl">
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
        <input type="number" aocUiInputText #allDis placeholder="Global discount + ⏎" (keyup.enter)="globalDiscount(allDis.value)">
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="hasItem" let-item="value">
        <span
          *ngIf="item"
          class="material-symbols-rounded"
          aocUiTooltip="This line has an associated item, click to see details"
          (click)="itemDetails(item)"
        >category</span>
      </ng-template>
      <ng-template aocGridCell="textEdit" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>
      <ng-template aocGridCell="numberEdit" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>
      <ng-template aocGridCell="taxEdit" let-formControl="formControl">
        <app-tax-autocomplete [formControl]="formControl" allow="none"></app-tax-autocomplete>
      </ng-template>
      <ng-template aocGridCell="store" let-formControl="formControl">
        <app-store-autocomplete allow="none" [formControl]="formControl"></app-store-autocomplete>
      </ng-template>
    </aoc-grid-field>
  `
})
export class DocumentLineGridFieldComponent implements OnInit {
  @Input() handleStores = false;
  protected $ = DocumentLineTemplate;
  protected modelConfig = inject(DocumentLineTemplateModelConfig);
  protected columns: AocGridColumn<DocumentLineTemplate>[];
  protected newItemControl = new FormControl<Item>(null);
  protected groupByCategoryControl = new FormControl(false);
  protected groupConfig: AocGridGroupConfig<string>;
  protected storeControl: FormControl<Store>;

  @AocUnsubscribe
  private newItemControlSubscription: Subscription;
  @AocUnsubscribe
  private groupByCategoryControlSubscription: Subscription;
  private itemModelConfig = inject(ItemModelConfig);
  private taxModelConfig = inject(TaxModelConfig);
  private questPricePipe = inject(QuestPricePipe);
  private questPercentPipe = inject(QuestPercentPipe);
  private questDefaultsService = inject(QuestDefaultsService);
  private ngControl = inject(NgControl);
  private aocFormWindowService = inject(AocFormWindowService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private aocUiToastMessageService = inject(AocUiToastMessageService);
  @ViewChild('allDis', { read: ElementRef }) private allDiscountElementRef: ElementRef;
  @ViewChild('itemAutocompleteComponent', { read: ElementRef }) private itemAutocompleteElementRef: ElementRef;

  ngOnInit() {
    this.columns = [
      {
        header: '',
        display: [ DocumentLineTemplate.entity.ITEM, aocUiTplRef("hasItem") ],
        size: '4rem',
        align: 'center'
      },
      {
        header: 'Code',
        display: DocumentLineTemplate.field.ITEM_CODE,
        size: '10rem',
        editable: [ aocUiTplRef('textEdit'), new FormControl(null) ]
      },
      {
        header: 'Name',
        display: DocumentLineTemplate.field.ITEM_NAME,
        editable: [ aocUiTplRef('textEdit'), new FormControl(null, Validators.required) ]
      }
    ];
    if (this.handleStores) {
      this.columns.push(
        {
          header: 'Store',
          display: [DocumentLineTemplate.entity.STORE, Store.field.NAME],
          formControlName: DocumentLineTemplate.entity.STORE,
          editable: (line: DocumentLineTemplate) => line.item ? aocUiTplRef('store') : undefined
        }
      );
    }
    this.columns.push(
      {
        header: 'Base price',
        display: [ DocumentLineTemplate.field.BASE_PRICE, this.questPricePipe ],
        size: '10rem',
        align: 'right',
        editable: [ aocUiTplRef('numberEdit'), new FormControl(null, [Validators.required, AocUiValidators.number(2)]) ]
      },
      {
        header: 'Quantity',
        display: DocumentLineTemplate.field.QUANTITY,
        size: '10rem',
        align: 'right',
        editable: [ aocUiTplRef('numberEdit'), new FormControl(null, [Validators.required, AocUiValidators.number()]) ]
      },
      {
        header: 'Discount',
        display: [ DocumentLineTemplate.field.DISCOUNT, this.questPercentPipe ],
        size: '10rem',
        align: 'right',
        editable: [ aocUiTplRef('numberEdit'), new FormControl(null, [Validators.required, AocUiValidators.numberInInterval(0, 100, 2)]) ]
      },
      {
        header: 'Tax to apply',
        display: [ DocumentLineTemplate.entity.TAX, this.taxModelConfig ],
        size: '15rem',
        align: 'right',
        formControlName: DocumentLineTemplate.entity.TAX,
        editable: [ aocUiTplRef('taxEdit'), new FormControl(null, Validators.required) ]
      },
      {
        header: 'Total base',
        display: [ DocumentLineTemplate.field.TOTAL_BASE, this.questPricePipe ],
        size: '10rem',
        align: 'right',
        ngStyle: { fontWeight: 'bold' }
      }
    );
    this.newItemControlSubscription = this.newItemControl.valueChanges.subscribe(item => {
      if (item) {
        this.handleNewLine(item).then(_ => this.newItemControl.setValue(null));
      }
    });
    this.groupByCategoryControlSubscription = this.groupByCategoryControl.valueChanges.subscribe(group => {
      if (group) {
        this.groupConfig = {
          trackBy: catName => catName,
          display: aocGridGroupDisplay((line: DocumentLineTemplate) => line?.item?.category?.name ?? 'Uncategorized'),
          compareFn: 'auto'
        };
      } else {
        this.groupConfig = undefined;
      }
    });
    this.storeControl = new FormControl<Store>(this.questDefaultsService.store);
  }

  protected itemDetails(item: Item) {
    this.aocFormWindowService.openUsingModelConfig({
      modelConfig: this.itemModelConfig,
      aocFormConfig: {
        persistToDatabase: true,
        loadFromDatabase: true,
        modelOrId: item
      }
    }).then();
  }

  protected modelChange(ev: AocGridFieldModelEvent<DocumentLineTemplate>) {
    // Not the item code and not the item name because the changes could come, for example,
    // from global discount method. In this case aoc grid field doesn't know about the changed field
    // and recalculate line total would not be fired
    if (
      ev.type === 'update' &&
      ![DocumentLineTemplate.field.ITEM_CODE, DocumentLineTemplate.field.ITEM_NAME].includes(ev.field)
    ) {
      this.recalculateLineTotal(ev.model);
      ev.updateModel(ev.model);
    }
  }

  protected globalDiscount(discount: string) {
    try {
      const d = Big(discount);
      if (d.lt('0') || d.gt(100)) {
        this.aocUiToastMessageService.showWarning('Discount must be a value between 0 and 100');
        return;
      }
      const formattedDiscount = d.round(2, Big.roundHalfUp).toString();
      const current: DocumentLineTemplate[] = this.ngControl.control.value;
      for (const line of current) {
        line.discount = formattedDiscount;
      }
      this.ngControl.control.setValue(current);
      this.allDiscountElementRef.nativeElement.value = null;
    } catch (_) {
      this.aocUiToastMessageService.showError('Wrong number for global discount');
    }
  }

  protected async handleNewLine(item?: Item) {
    const currentLines: DocumentLineTemplate[] = this.ngControl.control.value;
    const newLine = new DocumentLineTemplate();
    newLine.order = Math.max(...currentLines.length ? currentLines.map(l => l.order) : [0]) + 1;
    newLine.item = item;
    newLine.item_code = `${item?.code ?? ''}`;
    newLine.item_name = item?.name ?? '';
    newLine.base_price = item?.base_price ?? '0.00';
    newLine.tax = item?.tax ?? this.questDefaultsService.$tax;
    newLine.store = this.handleStores && item ? this.storeControl.value : undefined;
    const response = await this.aocFormWindowService.openUsingModelConfig({
      modelConfig: this.modelConfig,
      aocFormConfig: {
        persistToDatabase: false,
        modelOrId: newLine,
        loadFromDatabase: false,
        disableSafeClose: true
      },
      aocUiWindowDynConfig: {
        parentWindowNumber: this.aocUiWindowDynRef.windowNumber
      }
    })
    if (response.type === 'save') {
      this.recalculateLineTotal(response.model);
      currentLines.push(response.model);
      this.ngControl.control.setValue(currentLines);
    }
    this.itemAutocompleteElementRef.nativeElement.querySelector('.aoc-ui-autocomplete-input').focus();
  }

  protected setCurrentStoreToAllLines() {
    const currentLines: DocumentLineTemplate[] = this.ngControl.control.value;
    for (const line of currentLines) {
      if (line.item) {
        line.store = this.storeControl.value;
      }
    }
    this.ngControl.control.setValue(currentLines);
  }

  private recalculateLineTotal(line: DocumentLineTemplate) {
    if (!line) {
      return;
    }
    // Let's apply the discount after multiplying the base price by quantity
    // Another option could be to apply the discount on the base price and then multiply by the quantity
    let total = Big(line.base_price ?? '0').mul(line.quantity ?? 0);
    const discount = Big(line.discount ?? 0);
    if (discount.gte('0')) {
      total = total.minus(total.mul(discount).div('100'));
    }
    total = total.round(2, Big.roundHalfEven);
    line.total_base = total.toString();
  }
}
