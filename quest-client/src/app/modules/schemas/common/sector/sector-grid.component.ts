import { Component, OnInit } from '@angular/core';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { SectorModelConfig } from '../../../../model-configs/common/sector-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocQueryOrderMap, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Sector } from '../../../../models/common/sector';
import { AocUiTableCustomSortEvent, AocUiTableModule } from '@atlantis-of-code/aoc-client/ui/data/aoc-ui-table';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-sector-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiTableModule,
    NgForOf
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
      [autoExpandAllRows]="true"
      [customSort]="customSort"
    >
      <ng-template aocUiTableTemplate="rowExpansion" let-sector>
        <ul>
          <li *ngFor="let subsector of sector.subsectorCollection">{{subsector.nombre}}</li>
        </ul>
      </ng-template>
    </aoc-grid>
  `
})
export default class SectorGridComponent implements OnInit {
  columns: AocGridColumn[];

  restOptions: AocRestOptions<Sector> = {
    populate: {
      subsectorCollection: true
    }
  }

  customSort = (event: AocUiTableCustomSortEvent, arr: AocQueryOrderMap<Sector>[]) => {
    arr.push({
      subsectorCollection: {
        nombre: event.order === 1 ? 'asc' : 'desc'
      }
    });
  }

  constructor(
    public modelConfig: SectorModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) { }

  ngOnInit(): void {
    this.columns = [
      {header: 'Nombre', display: Sector.field.NOMBRE, defaultSort: 'asc'}
    ];
    this.aocUiWindowDynRef.header('Listado de sectores y subsectores');
    this.aocUiWindowDynRef.show();
  }
}
