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
import { FiscalYearModelConfig } from '../../../../model-configs/common/fiscal-year-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';

@Component({
  selector: 'app-fiscal-year-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns">
      <ng-template aocGridCell="current" let-isCurrent="value">
        <span *ngIf="isCurrent" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class FiscalYearGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected modelConfig = inject(FiscalYearModelConfig);
  protected columns: AocGridColumn<FiscalYear>[] = [
    {
      header: FiscalYear.i18n.IS_CURRENT,
      display: [ FiscalYear.field.IS_CURRENT, aocUiTplRef('current') ],
      size: '8rem',
      align: 'center'
    },
    {
      header: FiscalYear.i18n.YEAR,
      display: FiscalYear.field.YEAR,
      defaultSort: 'desc'
    }
  ];

  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  ngOnInit() {
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Fiscal Years',
      width: 320,
      height: 480
    };
  }
}
