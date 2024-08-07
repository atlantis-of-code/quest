import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { PaymentSystemModelConfig } from '../../../../model-configs/common/payment-system-model-config';
import { PaymentSystem } from '../../../../models/common/payment-system';

@Component({
  selector: 'app-payment-system-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiButtonModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      (selectionChange)="selected = $event"
    >
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Set default"
            [disabled]="selected.length !== 1 || selected[0].is_default"
            (click)="setDefault()"
          ></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="isDefault" let-isDefault="value">
        <span *ngIf="isDefault" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class PaymentSystemGridComponent implements AocUiWindowDynConfigurable {
  protected modelConfig = inject(PaymentSystemModelConfig);

  protected columns: AocGridColumn<PaymentSystem>[] = [
    {
      header: 'Default',
      display: [ PaymentSystem.field.IS_DEFAULT, aocUiTplRef('isDefault' )],
      size: '7rem',
      align: 'center'
    },
    {
      header: 'Name',
      display: PaymentSystem.field.NAME,
      defaultSort: 'asc'
    }
  ];

  protected selected: PaymentSystem[] = [];

  private aocRestService = inject(AocRestService);

  protected async setDefault() {
    const paymentSystem = this.selected[0];
    try {
      paymentSystem.is_default = true;
      await this.aocRestService.persist(PaymentSystem, paymentSystem);
    } catch (e) {
      paymentSystem.is_default = false;
    }
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 480,
      height: 480,
      header: 'Payment systems',
      autoshow: true
    }
  }
}
