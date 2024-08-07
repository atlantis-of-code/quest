import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { StoreModelConfig } from '../../../../model-configs/items/store-model-config';
import { Store } from '../../../../models/items/store';

@Component({
  selector: 'app-store-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns">
      <ng-template aocGridCell="default" let-value="value">
        <span *ngIf="value" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class StoreGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected modelConfig = inject(StoreModelConfig);
  protected columns: AocGridColumn[] = [
    {
      header: Store.i18n.IS_DEFAULT,
      display: [ Store.field.IS_DEFAULT, aocUiTplRef('default' )],
      size: '8rem',
      align: 'center'
    },
    {
      header: Store.i18n.NAME,
      display: Store.field.NAME,
      defaultSort: 'asc'
    }
  ];

  private aocUiWindowDynRef = inject(AocUiWindowDynRef);

  ngOnInit() {
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Stores',
      width: 320,
      height: 480
    };
  }
}
