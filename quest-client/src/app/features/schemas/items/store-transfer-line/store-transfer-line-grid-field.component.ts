import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { Subscription, timer } from 'rxjs';
import { ItemModelConfig } from '../../../../model-configs/items/item-model-config';
import { StoreTransferLineModelConfig } from '../../../../model-configs/items/store-transfer-line-model-config';
import { Item } from '../../../../models/items/item';
import { StoreTransferLine } from '../../../../models/items/store-transfer-line';
import { ItemAutocompleteComponent } from '../item/item-autocomplete.component';

@Component({
  selector: 'app-store-transfer-line-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    ItemAutocompleteComponent,
    AocUiItemModule,
    ReactiveFormsModule,
    AocUiInputTextModule
  ],
  template: `
    <aoc-grid-field [modelConfig]="modelConfig" [columns]="columns">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item label="Item selector">
            <app-item-autocomplete
              [formControl]="itemControl"
              placeholder="select item to transfer..."
              allow="none" style="width: 40rem"
            ></app-item-autocomplete>
        </aoc-ui-item>
      </ng-template>
      <ng-template [aocGridCell]="$.field.QUANTITY" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>
    </aoc-grid-field>
  `
})
export class StoreTransferLineGridFieldComponent implements OnInit {
  protected $ = StoreTransferLine;
  protected modelConfig = inject(StoreTransferLineModelConfig);
  protected columns: AocGridColumn<StoreTransferLine>[];
  protected itemControl = new FormControl<Item>(null);

  private itemModelConfig = inject(ItemModelConfig);
  @AocUnsubscribe
  private itemSubscription: Subscription;
  private ngControl = inject(NgControl);
  private aocUiToastMessageService = inject(AocUiToastMessageService);

  ngOnInit() {
    this.columns = [
      {
        header: 'Item',
        display: [ StoreTransferLine.entity.ITEM, this.itemModelConfig ]
      },
      {
        header: 'Quantity',
        display: StoreTransferLine.field.QUANTITY,
        size: '9rem',
        align: 'right',
        editable: true
      }
    ];

    this.itemSubscription = this.itemControl.valueChanges.subscribe(item => {
      if (item) {
        const current: StoreTransferLine[] = this.ngControl.control.value;
        if (current.some(stl => stl.item.id === item.id)) {
          this.aocUiToastMessageService.showError('Item is already in list');
          return;
        }
        const storeTransferLine = new StoreTransferLine();
        storeTransferLine.item = item;
        storeTransferLine.quantity = '1';
        current.push(storeTransferLine);
        this.ngControl.control.setValue(current);
        timer(0).subscribe(_ => this.itemControl.reset());
      }
    });
  }
}
