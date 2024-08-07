import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocDirectivesModule } from '@atlantis-of-code/aoc-client/core/directives';
import { AocGridColumn, AocSpreadsheetColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';
import { AocUiFileSelectModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-file-select';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiInputGroupModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-group';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { Subscription } from 'rxjs';
import { StockCountModelConfig } from '../../../../model-configs/items/stock-count-model-config';
import { StockModelConfig } from '../../../../model-configs/items/stock-model-config';
import { File } from '../../../../models/files/file';
import { Item } from '../../../../models/items/item';
import { Stock } from '../../../../models/items/stock';
import { StockCount } from '../../../../models/items/stock-count';
import { Store } from '../../../../models/items/store';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestFilesService } from '../../../../services/quest-files.service';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { StoreAutocompleteComponent } from '../store/store-autocomplete.component';

@Component({
  selector: 'app-stock-count-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiButtonModule,
    AocUiInputGroupModule,
    StoreAutocompleteComponent,
    AocUiVerticalSeparatorModule,
    ReactiveFormsModule,
    AocDirectivesModule,
    AocUiFileSelectModule,
    AocUiTooltipModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [restOptions]="restOptions" [columns]="columns" [modelEmitter]="modelEmitter">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item label="Download stock from store">
          <aoc-ui-input-group>
            <app-store-autocomplete allow="none" placeholder="Select store..." [formControl]="storeFormControl"></app-store-autocomplete>
            <button aocUiButton
                    icon="file_download"
                    label="Download"
                    [disabled]="!storeFormControl.value"
                    aocSpreadsheet
                    [where]="stockFilterQuery"
                    [restOptions]="stockRestOptions"
                    [modelConfig]="stockModelConfig"
                    [columns]="stockSpreadsheetColumns"
                    [fileName]="stockFileName"
            ></button>
          </aoc-ui-input-group>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          <button
            aocUiButton
            icon="file_upload"
            label="Load stock count file"
            (aocUiFileSelect)="loadStockCount($event)"
          ></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="downloadFile" let-file="value">
        <button
          aocUiButton
          icon="file_download"
          label="Download file"
          (click)="downloadFile(file)"
          aocUiTooltip="Download file from server"
        ></button>
      </ng-template>
    </aoc-grid>
  `
})
export class StockCountGridComponent implements OnInit {
  @Input() modelEmitter: AocModelEmitter<StockCount>;
  protected modelConfig = inject(StockCountModelConfig);
  protected restOptions: AocRestOptions<StockCount> = {
    populate: {
      file: true
    }
  };
  protected columns: AocGridColumn<StockCount>[];
  // Store autocomplete
  protected storeFormControl = new FormControl<Store>(null);
  @AocUnsubscribe
  private storeFormControlSubscription: Subscription;
  // Stock controls to download stock file
  protected stockModelConfig = inject(StockModelConfig);
  protected stockFilterQuery: AocFilterQuery<Stock>;
  protected stockFileName: string;
  protected stockRestOptions: AocRestOptions<Stock>;
  protected stockSpreadsheetColumns: AocSpreadsheetColumn[];

  private questUtilsService = inject(QuestUtilsService);
  private questFilesService = inject(QuestFilesService);
  private questDatePipe = inject(QuestDatePipe);
  private httpClient = inject(HttpClient);
  private aocConfig = inject(AocConfig);
  private aocUiToastMessageService = inject(AocUiToastMessageService);

  ngOnInit() {
    this.columns = [
      {
        header: 'Date',
        display: [ StockCount.field.DATE, this.questDatePipe ],
        size: '12rem'
      },
      {
        header: 'File',
        display: [ StockCount.entity.FILE, File.field.NAME ]
      },
      {
        header: '',
        display: [ StockCount.entity.FILE, aocUiTplRef('downloadFile')],
        size: '20rem',
        align: 'center',
        sortable: false
      }
    ];

    this.storeFormControlSubscription = this.storeFormControl.valueChanges.subscribe(store => {
      if (store) {
        this.stockFileName = `Stock for ${store.name}`;
        this.stockFilterQuery = {
          store: { id: store.id }
        };
      }
    });

    this.stockRestOptions = {
      populate: {
        store: true,
        item: true
      },
      orderBy: {
        item: {
          code: 'asc',
          name: 'asc'
        }
      }
    };

    this.stockSpreadsheetColumns = [
      { header: 'Id', field: 'id', type: 'string' },
      { header: 'Store', field: [ Stock.entity.STORE, Store.field.NAME ] },
      { header: 'Code', field: [ Stock.entity.ITEM, Item.field.CODE ]},
      { header: 'Name', field: [ Stock.entity.ITEM, Item.field.NAME ]},
      { header: 'Quantity', field: Stock.field.QUANTITY }
    ];
  }

  protected async loadStockCount(fileList: FileList) {
    if (fileList.length !== 1) {
      return;
    }
    const file = fileList.item(0);
    const fileName = file.name;
    const payload = await this.questUtilsService.getRawDataFromFile(file);
    this.httpClient.post(
      `${this.aocConfig.SERVER_URL}stock/load_stock_count_file`,
      { payload, fileName },
      { withCredentials: true }
    ).subscribe({
      next: _ => {
        this.aocUiToastMessageService.showSuccess('Stock count file processed');
      },
      error: _ => {
        // Error is shown automatically by the interceptor
      }
    });
  }

  downloadFile(file: File) {
    this.questFilesService.download(file);
  }
}
