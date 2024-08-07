import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { GenderModelConfig } from '../../../../model-configs/common/gender-model-config';
import { Gender } from '../../../../models/common/gender';

@Component({
  selector: 'app-gender-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiButtonModule,
    NgIf
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" (selectionChange)="selected = $event">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Set as default"
            [disabled]="selected.length !== 1 || selected[0].is_default"
            (click)="setDefault()"
          ></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="defaultTpl" let-isDefault="value">
        <span *ngIf="isDefault" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class GenderGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected modelConfig = inject(GenderModelConfig);
  protected columns: AocGridColumn[] = [
    { header: '' , display: [Gender.field.IS_DEFAULT, aocUiTplRef('defaultTpl')], size: '4rem', align: 'center' },
    { header: 'Name', display: Gender.field.NAME, defaultSort: 'asc' }
  ];
  protected selected: Gender[] = [];

  private aocRestService = inject(AocRestService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  ngOnInit() {
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Genders',
      width: 480,
      height: 320
    };
  }

  protected async setDefault() {
    const gender = this.selected[0];
    gender.is_default = true;
    try {
      await this.aocRestService.persist(Gender, gender);
    } catch (e) {
      gender.is_default = false;
    }
  }
}
