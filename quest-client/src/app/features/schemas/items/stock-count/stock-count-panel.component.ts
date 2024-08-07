import { Component, inject } from '@angular/core';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocTabConfigurable } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { of } from 'rxjs';
import { StockCountModelConfig } from '../../../../model-configs/items/stock-count-model-config';
import { StockCount } from '../../../../models/items/stock-count';
import { StockLog } from '../../../../models/items/stock-log';
import { StockLogGridComponent } from '../stock-log/stock-log-grid.component';
import { StockCountGridComponent } from './stock-count-grid.component';

@Component({
  selector: 'app-stock-count-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    StockCountGridComponent,
    StockLogGridComponent
  ],
  template: `
    <aoc-master-detail [masterModelConfig]="modelConfig" [masterModelEmitter]="modelEmitter" [detailWidthPercent]="50">
      <ng-template aocMaster>
        <app-stock-count-grid [modelEmitter]="modelEmitter"></app-stock-count-grid>
      </ng-template>
      <ng-template aocDetail tabName="Associated stock logs">
        <app-stock-log-grid [modelListener]="stockLogListener"></app-stock-log-grid>
      </ng-template>
    </aoc-master-detail>
  `
})
export default class StockCountPanelComponent implements AocTabConfigurable{
  protected modelConfig = inject(StockCountModelConfig);
  @AocUnsubscribe
  protected modelEmitter = new AocModelEmitter<StockCount>();
  @AocUnsubscribe
  protected stockLogListener = new AocModelListener<StockLog>([
    {
      emitter: this.modelEmitter,
      type: 'filter query',
      filterQuery: aocSetId('stockCount')
    }
  ]);

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Stock counts')
    };
  }
}
