import { Component, Input, OnInit } from '@angular/core';
import { ClienteModelConfig } from '../../../../model-configs/clientes/cliente-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Cliente } from '../../../../models/clientes/cliente';
import { EmbDatosFiscales } from '../../../../models/abstract/emb-datos-fiscales';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { DatosFiscalesPipe } from '../../../../pipes/datos-fiscales.pipe';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-cliente-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [modelEmitter]="aocEmitter"
      searchInputMode="queryBuilderFunctions"
    >
    </aoc-grid>
  `
})
export class ClienteGridComponent implements OnInit {
  @Input()
  aocEmitter: AocModelEmitter<Cliente>;

  columns: AocGridColumn[];

  constructor(
    public modelConfig: ClienteModelConfig,
    private datosFiscalesPipe: DatosFiscalesPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Código', display: Cliente.field.CODIGO, size: '10rem', align: 'right', defaultSort: 'asc' },
      { header: 'Núm.Documento', display: [Cliente.embedded.EMB_DATOS_FISCALES, EmbDatosFiscales.field.NUMERO_DOCUMENTO], size: '11.666rem', align: 'right' },
      { header: 'Nombre fiscal', display: [Cliente.embedded.EMB_DATOS_FISCALES, this.datosFiscalesPipe] },
      { header: 'Nombre comercial', display: [Cliente.field.NOMBRE_COMERCIAL] },
    ]
  }
}
