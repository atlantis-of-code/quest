import { Component, Input, OnInit } from '@angular/core';
import { AocModelConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocModel } from '@atlantis-of-code/aoc-client/core/models';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { EmbDocumento } from '../../../../models/abstract/emb-documento';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AnyoFiscal } from '../../../../models/common/anyo-fiscal';
import { Cliente } from '../../../../models/clientes/cliente';
import { FechaPipe } from '../../../../pipes/fecha.pipe';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { DatosFiscalesPipe } from '../../../../pipes/datos-fiscales.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-emb-document-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelEmitter]="aocEmitter"
      [modelConfig]="modelConfig"
      [columns]="columns"
      [restOptions]="restOptions"
    ></aoc-grid>

  `
})
export class EmbDocumentoGridComponent implements OnInit {
  @Input() aocEmitter = new AocModelEmitter<AocModel>();

  @Input()
  modelConfig: AocModelConfig<any>;

  columns: AocGridColumn<EmbDocumento>[];

  restOptions: AocRestOptions<EmbDocumento> = {
    populate: {
      anyoFiscal: true,
      cliente: true
    }
  }

  constructor(
    private fechaPipe: FechaPipe,
    private datosFiscalesPipe: DatosFiscalesPipe,
    private precioPipe: PrecioPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Año fiscal', display: [EmbDocumento.entity.ANYO_FISCAL, AnyoFiscal.field.ANYO], align: 'right', size: '8rem' },
      { header: 'Serie', display: EmbDocumento.field.SERIE, align: 'right', size: '6rem' },
      { header: 'Número', display: EmbDocumento.field.NUMERO, align: 'right', size: '8rem' },
      { header: 'Fecha', display: [EmbDocumento.field.FECHA, this.fechaPipe], align: 'right', size: '10rem', defaultSort: 'desc' },
      {
        header: 'Cliente',
        display: [EmbDocumento.entity.CLIENTE, this.datosFiscalesPipe],
        orderBy: {
          cliente: {
            embDatosFiscales: {
              nombre_fiscal: 'auto',
              apellido_1: 'auto',
              apellido_2: 'auto'
            }
          }
        }
      },
      { header: 'Total base', display: [EmbDocumento.field.TOTAL_BASE, this.precioPipe], align: 'right', size: '12rem' },
      { header: 'Total impuestos', display: [EmbDocumento.field.TOTAL_IMPUESTOS, this.precioPipe], align: 'right', size: '12rem' },
      { header: 'Total', display: [EmbDocumento.field.TOTAL, this.precioPipe], align: 'right', size: '12rem' },
    ]
  }
}
