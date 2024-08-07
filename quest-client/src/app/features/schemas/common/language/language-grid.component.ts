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
import { LanguageModelConfig } from '../../../../model-configs/common/language-model-config';
import { Country } from '../../../../models/common/country';
import { Language } from '../../../../models/common/language';

@Component({
  selector: 'app-language-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf,
    AocUiButtonModule,
    AocUiItemModule,
    AocUiToolbarModule
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
      <ng-template aocGridCell="languageTpl" let-isDefault="value">
        <span *ngIf="isDefault" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class LanguageGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected modelConfig = inject(LanguageModelConfig);
  protected columns: AocGridColumn[] = [
    {
      header: 'Default',
      display: [ Language.field.IS_DEFAULT, aocUiTplRef('languageTpl' ) ],
      size: '4rem',
      align: 'center'
    },
    {
      header: 'Name',
      display: Language.field.NAME,
      defaultSort: 'asc'
    },
    { header: 'Iso Code 2', display: Country.field.ISO_CODE2 },
    { header: 'Iso Code 3', display: Country.field.ISO_CODE3 }
  ];
  protected selected: Language[] = [];

  private aocRestService = inject(AocRestService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);

  ngOnInit() {
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Languages',
      width: 640,
      height: 480
    };
  }

  async setDefault() {
    const language = this.selected[0];
    language.is_default = true;
    try {
      await this.aocRestService.persist(Language, language);
    } catch (e) {
      language.is_default = false;
    }
  }
}
