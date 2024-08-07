import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AocFilterQuery } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { Subscription } from 'rxjs';
import { CountryModelConfig } from '../../../../model-configs/common/country-model-config';
import { Country } from '../../../../models/common/country';

@Component({
  selector: 'app-country-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiInputCheckboxModule,
    ReactiveFormsModule,
    AocUiButtonModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [where]="where" (selectionChange)="selected = $event">
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
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Show Default" [formControl]="defaultFormControl">
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="default" let-isDefault="value">
        <span *ngIf="isDefault" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>`
})
export default class CountryGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected modelConfig = inject(CountryModelConfig);
  protected columns: AocGridColumn[] = [
    {
      header: '',
      headerTooltip: 'Default country',
      display: [ Country.field.IS_DEFAULT, aocUiTplRef('default')],
      align: 'center',
      size: '4rem'
    },
    {
      header: 'Name',
      display: Country.field.NAME,
      defaultSort: 'asc'
    },
    { header: 'Iso Code 2', display: Country.field.ISO_CODE2 },
    { header: 'Iso Code 3', display: Country.field.ISO_CODE3 }
  ];
  protected selected: Country[] = [];
  // Filtering
  protected where: AocFilterQuery<Country>;
  protected defaultFormControl = new FormControl(false);
  @AocUnsubscribe
  private defaultFormControlSubscription: Subscription;
  // Grid will be in a window
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private aocRestService = inject(AocRestService);

  ngOnInit() {
    this.defaultFormControlSubscription = this.defaultFormControl.valueChanges.subscribe(showDefault => {
      if (showDefault) {
        this.where = { is_default: true }
      } else {
        this.where = undefined;
      }
    });
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Countries',
      width: 640,
      height: 640
    };
  }

  protected async setDefault() {
    const country = this.selected[0];
    country.is_default = true;
    try {
      await this.aocRestService.persist(
        Country,
        country
      );
    } catch (_) {
      country.is_default = false;
    }
  }
}
