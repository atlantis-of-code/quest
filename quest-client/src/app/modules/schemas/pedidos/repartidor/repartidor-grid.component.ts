import { Component, OnInit } from '@angular/core';
import { RepartidorModelConfig } from '../../../../model-configs/pedidos/repartidor-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Repartidor } from '../../../../models/pedidos/repartidor';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { TelefonosPipe } from '../../../../pipes/telefonos.pipe';
@Component({
  standalone: true,
  selector: 'app-repartidor-grid',
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns"></aoc-grid>
  `
})
export default class RepartidorGridComponent implements OnInit {
  protected columns: AocGridColumn<Repartidor>[];
  constructor(
    protected modelConfig: RepartidorModelConfig,
    private telefonosPipe: TelefonosPipe
  ) {}

  ngOnInit() {
    this.columns = [
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
        display: Repartidor.field.EMAIL
      }
    ];
  }
}
