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
import { TaxModelConfig } from '../../../../model-configs/common/tax-model-config';
import { Tax } from '../../../../models/common/tax';
import { QuestPercentPipe } from '../../../../pipes/quest-percent.pipe';

@Component({
  selector: 'app-tax-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns">
      <ng-template aocGridCell="default" let-defaultTax="value">
        <span *ngIf="defaultTax" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class TaxGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected columns: AocGridColumn[];

  protected modelConfig = inject(TaxModelConfig);

  private questPercentPipe = inject(QuestPercentPipe);

  private aocUiWindowDynRef = inject(AocUiWindowDynRef);

  ngOnInit() {
    this.columns = [
      {
        header: 'Default',
        display: [ Tax.field.IS_DEFAULT, aocUiTplRef('default') ],
        size: '8rem',
        align: 'center'
      },
      {
        header: 'Name',
        display: Tax.field.NAME
      },
      {
        header: 'Percent',
        display: [ Tax.field.PERCENT,  this.questPercentPipe],
        defaultSort: 'desc'
      }
    ];
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Taxes',
      width: 640,
      height: 480
    };
  }
}
