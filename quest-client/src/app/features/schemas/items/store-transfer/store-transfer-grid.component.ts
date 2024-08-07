import { Component, inject, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocGridColumn, AocTabConfigurable } from '@atlantis-of-code/aoc-client/core/types';
import { of } from 'rxjs';
import { StoreTransferModelConfig } from '../../../../model-configs/items/store-transfer-model-config';
import { Store } from '../../../../models/items/store';
import { StoreTransfer } from '../../../../models/items/store-transfer';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';

@Component({
  selector: 'app-store-transfer-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [restOptions]="restOptions"></aoc-grid>
  `
})
export default class StoreTransferGridComponent implements OnInit, AocTabConfigurable {
  protected modelConfig = inject(StoreTransferModelConfig);
  protected columns: AocGridColumn<StoreTransfer>[];
  protected restOptions: AocRestOptions<StoreTransfer> = {
    populate: {
      sourceStore: true,
      targetStore: true
    }
  };

  private questDatePipe = inject(QuestDatePipe);

  ngOnInit() {
    this.columns = [
      {
        header: 'Date',
        display: [ StoreTransfer.field.DATE, this.questDatePipe ],
        size: '8rem',
        align: 'right'
      },
      {
        header: 'Source store',
        display: [ StoreTransfer.entity.SOURCE_STORE, Store.field.NAME ]
      },
      {
        header: 'Target store',
        display: [ StoreTransfer.entity.TARGET_STORE, Store.field.NAME]
      }
    ];
  }

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Store transfers')
    };
  }
}
