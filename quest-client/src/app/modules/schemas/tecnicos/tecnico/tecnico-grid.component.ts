import { Component, OnInit } from '@angular/core';
import { TecnicoModelConfig } from '../../../../model-configs/tecnicos/tecnico-model-config';
import { Tecnico } from '../../../../models/tecnicos/tecnico';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { TelefonosPipe } from '../../../../pipes/telefonos.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-tecnico-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
    ></aoc-grid>
  `
})
export default class TecnicoGridComponent implements OnInit {
  columns: AocGridColumn<Tecnico>[];

  constructor(
    public modelConfig: TecnicoModelConfig,
    private telefonosPipe: TelefonosPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Serie en facturas',
        display: Tecnico.field.SERIE_EN_FACTURAS,
        size: '12rem'
      },
      {
        header: 'Nombre',
        display: this.modelConfig.transform,
        defaultSort: 'asc',
        orderBy: {
          nombre_fiscal: 'auto',
          apellido_1: 'auto',
          apellido_2: 'auto'
        }
      },
      {
        header: 'Teléfonos',
        display: this.telefonosPipe,
        orderBy: {
          telefono1: 'auto',
          telefono2: 'auto',
          telefono3: 'auto'
        },
      },
      {
        header: 'Correo electrónico',
        display: Tecnico.field.EMAIL
      }
    ];
  }
}
