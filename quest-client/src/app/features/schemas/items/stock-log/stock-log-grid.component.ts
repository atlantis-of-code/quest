import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { StockLogModelConfig } from '../../../../model-configs/items/stock-log-model-config';
import { Item } from '../../../../models/items/item';
import { StockLog } from '../../../../models/items/stock-log';
import { Store } from '../../../../models/items/store';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';

@Component({
  selector: 'app-stock-log-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [restOptions]="restOptions" [modelListener]="modelListener"></aoc-grid>
  `
})
export class StockLogGridComponent implements OnInit {
  @Input() modelListener: AocModelListener<StockLog>;
  protected modelConfig = inject(StockLogModelConfig);
  protected columns: AocGridColumn<StockLog>[];
  protected restOptions: AocRestOptions<StockLog> = {
    populate: {
      store: true,
      item: true
    }
  }

  private questDatePipe = inject(QuestDatePipe);

  ngOnInit() {
    this.columns = [
      {
        header: 'Date',
        display: [ StockLog.field.DATE, this.questDatePipe ],
        size: '12rem'
      },
      {
        header: 'Item',
        display: [ StockLog.entity.ITEM, Item.field.NAME ]
      },
      {
        header: 'Store',
        display: [ StockLog.entity.STORE, Store.field.NAME ]
      },
      {
        header: 'Quantity',
        display: StockLog.field.QUANTITY,
        size: '9rem',
        align: 'right'
      }
    ];
  }
}
