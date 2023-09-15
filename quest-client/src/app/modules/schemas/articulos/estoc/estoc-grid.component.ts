import { Component, Input, OnInit } from '@angular/core';
import { EstocModelConfig } from '../../../../model-configs/articulos/estoc-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Estoc } from '../../../../models/articulos/estoc';
import { Almacen } from '../../../../models/articulos/almacen';
import { AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-estoc-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [(where)]="where"
      [restOptions]="restOptions"
      [modelListener]="modelListener"
    >
      <ng-template aocUiToolbar="left">
      </ng-template>
    </aoc-grid>
  `
})
export class EstocGridComponent implements OnInit {
  @Input() modelListener: AocModelListener<Estoc>

  @Input() parentGrid: 'artículos' | 'almacenes';

  restOptions: AocRestOptions<Estoc>;

  where: AocFilterQuery<Estoc> = {};

  columns: AocGridColumn<Estoc>[];

  constructor(
    public modelConfig: EstocModelConfig,
    private articuloModelConfig: ArticuloModelConfig
  ) { }

  ngOnInit(): void {
    if (this.parentGrid === 'artículos') {
      this.restOptions = {
        populate: {
          almacen: true
        },
      }
    } else {
      this.restOptions = {
        populate: {
          articulo: true
        }
      };
    }
    if (this.parentGrid === 'artículos') {
      this.columns = [
        {
          header: 'Almacén',
          display: [Estoc.entity.ALMACEN, Almacen.field.NOMBRE],
          defaultSort: 'desc'
        }
      ];
    } else {
      this.columns = [
        {
          header: 'Artículos',
          display: [Estoc.entity.ARTICULO, this.articuloModelConfig.transform],
          defaultSort: 'desc'
        }
      ];
    }

    this.columns.push({
      header: 'Cantidad',
      display: [Estoc.field.CANTIDAD],
      align: 'right',
      size: '15rem'
    });
  }
}
