import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocFormWindowService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn, AocGridGroupConfig, AocGridToolbarButtonConfig } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiDataMenuItem, aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiMenuOverlayService } from '@atlantis-of-code/aoc-client/ui/menu/aoc-ui-menu-overlay';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { SeriesModelConfig } from '../../../../model-configs/common/series-model-config';
import { Series, SeriesType, SeriesTypeAocUiDataDropdown } from '../../../../models/common/series';

@Component({
  selector: 'app-series-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [groupConfig]="groupConfig" [buttonConfig]="buttonConfig">
      <ng-template aocGridCell="default" let-isDefault="value">
        <span *ngIf="isDefault" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class SeriesGridComponent implements AocUiWindowDynConfigurable {
  protected modelConfig = inject(SeriesModelConfig);
  protected columns: AocGridColumn<Series>[] = [
    {
      header: Series.i18n.IS_DEFAULT,
      display: [Series.field.IS_DEFAULT, aocUiTplRef('default') ],
      size: '8rem',
      align: 'center'
    },
    {
      header: Series.i18n.NAME,
      display: Series.field.NAME,
      defaultSort: 'asc'
    }
  ];
  protected groupConfig: AocGridGroupConfig<String> = {
    display: Series.field.TYPE
  };
  protected buttonConfig: AocGridToolbarButtonConfig = {
    addAction: (event) => {
      this.aocUiMenuOverlayService.toggle({
        menuModel: this.seriesMenu,
        anchorEl: event.target as HTMLElement,
      });
    }
  }

  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private aocUiMenuOverlayService = inject(AocUiMenuOverlayService);

  private seriesMenu = SeriesTypeAocUiDataDropdown
    .map(o => {
      return {
        ...o,
        command: () => this.add(o.value)
      } as AocUiDataMenuItem
    })
    .sort((o1, o2) => o1.label.localeCompare(o2.label));

  private aocFormWindowService = inject(AocFormWindowService);


  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Series',
      width: 420,
      height: 640,
      autoshow: true
    };
  }

  private add(seriesType: SeriesType) {
    this.aocFormWindowService.openUsingModelConfig({
      modelConfig: this.modelConfig,
      aocFormConfig: {
        persistToDatabase: true,
        dynamicFormGroup: {
          type: { value: seriesType }
        },
      },
      aocUiWindowDynConfig: {
        parentWindowNumber: this.aocUiWindowDynRef.windowNumber
      }
    }).then();
  }
}
