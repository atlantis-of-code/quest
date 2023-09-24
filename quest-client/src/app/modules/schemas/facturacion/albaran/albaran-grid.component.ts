import { Component, Input, OnInit } from '@angular/core';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { AlbaranModelConfig } from '../../../../model-configs/facturacion/albaran-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Albaran } from '../../../../models/facturacion/albaran';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { DatosFiscalesPipe } from '../../../../pipes/datos-fiscales.pipe';
import { DocumentoPipe } from '../../../../pipes/documento.pipe';
import { Factura } from '../../../../models/facturacion/factura';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { FacturaModelConfig } from '../../../../model-configs/facturacion/factura-model-config';
import { Router } from '@angular/router';
import { MavermaDefaultsService } from '../../../../services/maverma-defaults.service';
import { MavermaUserService } from '../../../../services/maverma-user.service';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';

@Component({
  selector: 'app-albaran-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    AocUiButtonModule,
    AocUiToolbarModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      [where]="where"
      [restOptions]="restOptions"
      [modelEmitter]="aocEmitter"
      (selectionChange)="cambioEnSeleccionados($any($event))"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Facturar seleccionados"
            [disabled]="!puedeGenerarFactura"
            (click)="generarFacturaConLosSeleccionados()"
          ></button>
        </aoc-ui-item>
      </ng-template>
    </aoc-grid>

  `
})
export class AlbaranGridComponent implements OnInit {
  @Input() aocEmitter: AocModelEmitter<Albaran>;

  columns: AocGridColumn<Albaran>[];

  restOptions: AocRestOptions<Albaran> = {
    orderBy: { fecha: 'desc' },
    populate: {
      cliente: true,
      serie: true,
      anyoFiscal: true,
      tecnico: true,
      factura: {
        anyoFiscal: true
      }
    }
  };

  where: AocFilterQuery<Albaran> = {};

  albaranesSeleccionados: Albaran[] = [];
  puedeGenerarFactura = false;

  constructor(
    public modelConfig: AlbaranModelConfig,
    private facturaModelConfig: FacturaModelConfig,
    private mavermaUtils: QuestUtilsService,
    private datosFiscalesPipe: DatosFiscalesPipe,
    private documentoPipe: DocumentoPipe,
    private restService: AocRestService,
    private formWindowService: AocFormWindowService,
    private mavermaDefaultsService: MavermaDefaultsService,
    private router: Router,
    private mavermaUserService: MavermaUserService
  ) { }

  ngOnInit() {
    if (this.mavermaUserService.esTecnico()) {
      this.where.tecnico = { id: this.mavermaUserService.getTecnicoId() }
    }
    this.columns = this.mavermaUtils.commonEmbDocumentColumns();
    this.columns.splice(4, 0, {
      header: 'Factura',
      display: [Albaran.entity.FACTURA, this.documentoPipe],
      size: '10rem',
      align: 'right'
    });
    this.columns.splice(5, 0, {
      header: 'Técnico',
      display: [Albaran.entity.TECNICO, this.datosFiscalesPipe]
    });
  }

  cambioEnSeleccionados(albaranes: Albaran[]) {
    this.albaranesSeleccionados = albaranes.filter(a => !a.factura);
    this.puedeGenerarFactura = this.albaranesSeleccionados.length > 0;
    let clienteId: string;
    for (const albaran of this.albaranesSeleccionados) {
      if (!clienteId) {
        clienteId = albaran.cliente.id;
      } else if (clienteId !== albaran.cliente.id) {
        this.puedeGenerarFactura = false;
        break;
      }
    }
  }

  async generarFacturaConLosSeleccionados() {
    const albaranesPopulated = await this.restService.find(
      Albaran,
      { id: { $in: this.albaranesSeleccionados.map(a => a.id) }},
      {
        orderBy: { fecha: 'desc' },
        populate: {
          cliente: true,
          anyoFiscal: true,
          direccionObra: true,
          direccionFiscal: true,
          tecnico: true,
          ficheroCollection: true,
          lineaAlbaranCollection: {
            articulo: true
          }
        }
      }
    );
    const response = await this.formWindowService.openUsingModelConfig<Factura>({
      modelConfig: this.facturaModelConfig,
      aocFormConfig: {
        persistToDatabase: true,
        dynamicFormGroup: {
          [Factura.entity.CLIENTE]: { value: albaranesPopulated[0].cliente },
          [Factura.entity.DIRECCION_FISCAL]: { value: albaranesPopulated[0].cliente.embDireccion },
          [Factura.collection.ALBARAN]: { value: albaranesPopulated, state: 'enabled' }
        }
      }
    });
    if (response.type === 'save') {
      this.router.navigate(['facturacion', 'factura', 'panel']).then();
    }
  };
}
