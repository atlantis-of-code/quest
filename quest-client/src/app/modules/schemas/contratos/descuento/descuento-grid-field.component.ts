import { Component, OnInit } from '@angular/core';
import { DescuentoModelConfig } from '../../../../model-configs/contratos/descuento-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Descuento } from '../../../../models/contratos/descuento';
import { Bombona } from '../../../../models/articulos/bombona';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { PorcentajePipe } from '../../../../pipes/porcentaje.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-descuento-grid-field',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
    ></aoc-grid-field>

  `
})
export class DescuentoGridFieldComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: DescuentoModelConfig,
    private fechaPipe: FechaPipe,
    private precioPipe: PrecioPipe,
    private porcentajePipe: PorcentajePipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Bombona',
        display: (descuento: Descuento) => `${descuento.bombona.codigo_maverma} - ${descuento.bombona.codigo_nace}`,
        orderBy: [ Descuento.entity.BOMBONA, Bombona.field.CODIGO_MAVERMA ]
      },
      {
        header: '€ Desc.',
        display: [Descuento.field.DESCUENTO_EUROS, this.precioPipe],
        align: 'right',
        size: '7rem'
      },
      {
        header: '% Desc.',
        display: [Descuento.field.DESCUENTO_PORCENTAJE, this.porcentajePipe],
        align: 'right',
        size: '7rem'
      },
      {
        header: 'Fecha ini',
        display: [Descuento.field.FECHA_INICIO, this.fechaPipe],
        defaultSort: 'desc',
        size: '7rem'
      },
      {
        header: 'Fecha fin',
        display: [Descuento.field.FECHA_FIN, this.fechaPipe],
        size: '7rem'
      },
      {
        header: '% Agencia',
        display: [Descuento.field.PORCENTAJE_AGENCIA, this.porcentajePipe],
        size: '10rem',
        align: 'right'
      },
      {
        header: '% Repsol',
        display: [Descuento.field.PORCENTAJE_REPSOL, this.porcentajePipe],
        size: '10rem',
        align: 'right'
      },
      {
        header: 'Desc.Máximo',
        display: (descuento: Descuento) => descuento.descuento_maximo ? 'Sí' : 'No',
        orderBy: Descuento.field.DESCUENTO_MAXIMO,
        size: '10rem',
        align: 'right'
      }
    ];
  }
}
