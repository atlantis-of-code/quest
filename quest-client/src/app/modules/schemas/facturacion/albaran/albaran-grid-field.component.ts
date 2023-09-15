import { NgForOf, NgIf } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule, NgControl } from "@angular/forms";
import {
  AocFilterQuery,
  AocRestOptions,
} from "@atlantis-of-code/aoc-client/aoc-common";
import { AocFormController } from "@atlantis-of-code/aoc-client/components/aoc-form";
import { AocGridModule } from "@atlantis-of-code/aoc-client/components/aoc-grid";
import { AocDynFormGroup } from "@atlantis-of-code/aoc-client/core/configs";
import { AocDirectivesModule } from "@atlantis-of-code/aoc-client/core/directives";
import { AocModel } from "@atlantis-of-code/aoc-client/core/models";
import {
  AocFormWindowService,
  AocRestService,
} from "@atlantis-of-code/aoc-client/core/services";
import {
  AocGridColumn,
  AocGridFieldModelEvent,
} from "@atlantis-of-code/aoc-client/core/types";
import { AocUiButtonModule } from "@atlantis-of-code/aoc-client/ui/button/aoc-ui-button";
import { AocUiItemModule } from "@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item";
import { AocUiVerticalSeparatorModule } from "@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator";
import { AocUiTableModule } from "@atlantis-of-code/aoc-client/ui/data/aoc-ui-table";
import { AocUiWindowDynRef } from "@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window";
import { AocUiToolbarModule } from "@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar";
import { AlbaranModelConfig } from "../../../../model-configs/facturacion/albaran-model-config";
import { Cliente } from "../../../../models/clientes/cliente";
import { Albaran } from "../../../../models/facturacion/albaran";
import { Factura } from "../../../../models/facturacion/factura";
import { FechaPipe } from "../../../../pipes/fecha.pipe";
import { PorcentajePipe } from "../../../../pipes/porcentaje.pipe";
import { PrecioPipe } from "../../../../pipes/precio.pipe";
import { AlbaranSelectComponent } from "./albaran-select.component";

@Component({
  selector: "app-albaran-grid-field",
  standalone: true,
  imports: [
    AocGridModule,
    AocDirectivesModule,
    AocUiItemModule,
    AocUiButtonModule,
    AocUiToolbarModule,
    AocUiVerticalSeparatorModule,
    AlbaranSelectComponent,
    FormsModule,
    AocUiTableModule,
    NgIf,
    NgForOf,
    PrecioPipe,
    PorcentajePipe
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
      [relationField]="AlbaranClass.entity.FACTURA"
      [aocDynFormGroup]="dynFormGroup"
      (modelChange)="onModelChange($event)"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Crear nuevo albarán"
            icon="add"
            (click)="crearNuevoAlbaran()"
            [disabled]="!_currentCliente"
          ></button>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          Albaranes disponibles del cliente seleccionado
        </aoc-ui-item>
        <aoc-ui-item>
          <app-albaran-select
            [where]="where"
            [restOptions]="restOptions"
            [(ngModel)]="albaranSeleccionado"
          ></app-albaran-select>
        </aoc-ui-item>
        <aoc-ui-item>
          <button
            aocUiButton
            label="Agregar albarán seleccionado"
            icon="arrow_downward"
            [disabled]="!albaranSeleccionado"
            (click)="agregarAlbaran(albaranSeleccionado)"
          ></button>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocUiTableTemplate="rowExpansion" let-albaran>
        <table
          class="lineas-de-albaranes-table"
          *ngIf="albaran.lineaAlbaranCollection.length > 0"
        >
          <thead>
            <tr class="header1">
              <th colspan="6">Líneas del albarán</th>
            </tr>
            <tr class="header2">
              <th class="aoc-ui-text-right col-width">Código</th>
              <th>Nombre</th>
              <th class="aoc-ui-text-right col-width">Precio</th>
              <th class="aoc-ui-text-right col-width">Cantidad</th>
              <th class="aoc-ui-text-right col-width">Descuento</th>
              <th class="aoc-ui-text-right col-width">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let linea of albaran.lineaAlbaranCollection">
              <td class="aoc-ui-text-right">{{ linea.codigo_articulo }}</td>
              <td>{{ linea.nombre_articulo }}</td>
              <td class="aoc-ui-text-right">
                {{ linea.precio_base | precio }}
              </td>
              <td class="aoc-ui-text-right">{{ linea.cantidad }}</td>
              <td class="aoc-ui-text-right">
                {{ linea.descuento | porcentaje }}
              </td>
              <td class="aoc-ui-text-right">{{ linea.total_base | precio }}</td>
            </tr>
          </tbody>
        </table>
      </ng-template>
    </aoc-grid-field>
  `,
})
export class AlbaranGridFieldComponent implements OnInit {
  @Input() set cliente(_cliente: Cliente) {
    if (!this.where) {
      return;
    }
    if (_cliente) {
      this.where.cliente = { id: _cliente.id };
    } else {
      this.where.cliente = { id: "-1" };
    }
    this.where = { ...this.where };
  }

  AlbaranClass = Albaran;

  dynFormGroup: AocDynFormGroup<Albaran> = {
    cliente: {
      state: "disabled",
    },
  };

  where: AocFilterQuery<Albaran>;
  restOptions: AocRestOptions<Albaran> = {
    orderBy: { fecha: "desc" },
    populate: {
      anyoFiscal: true,
      tecnico: true,
      cliente: true,
      direccionObra: true,
      direccionFiscal: true,
      ficheroCollection: true,
      lineaAlbaranCollection: {
        articulo: true,
      },
    },
  };
  notIn: string[] = [];

  columns: AocGridColumn<Albaran>[];

  albaranSeleccionado: Albaran;

  protected _currentCliente: Cliente;

  constructor(
    public modelConfig: AlbaranModelConfig,
    private fechaPipe: FechaPipe,
    private precioPipe: PrecioPipe,
    private restService: AocRestService,
    private ngControl: NgControl,
    private formController: AocFormController<Factura>,
    private formWindowService: AocFormWindowService,
    private windowDynRef: AocUiWindowDynRef
  ) {}

  ngOnInit(): void {
    this.modelConfig = this.modelConfig.cloneWith({
      allow: ["edit", "delete"],
      formPath: ["facturacion", "albaran", "form"],
    });
    this.columns = [
      {
        header: "Tipo documento",
        display: (_) => "Albarán",
      },
      {
        header: "Fecha",
        display: [Albaran.field.FECHA, this.fechaPipe],
        defaultSort: "desc",
      },
      {
        header: "Serie",
        display: Albaran.field.SERIE,
        align: "right",
      },
      {
        header: "Número",
        display: Albaran.field.NUMERO,
        align: "right",
      },
      {
        header: "Total base",
        display: [Albaran.field.TOTAL_BASE, this.precioPipe],
        align: "right",
        size: "12rem",
      },
      /*
      {
        header: 'Total impuestos',
        display: [Albaran.field.TOTAL_IMPUESTOS, this.precioPipe],
        align: 'right'
      },
      {
        header: 'Total',
        display: [Albaran.field.TOTAL, this.precioPipe],
        align: 'right'
      }
       */
    ];
    this.where = {
      factura: null,
      id: { $nin: this.notIn },
      cliente: { id: "-1" },
    };
    this.handleFormController().then();
  }

  async handleFormController() {
    const factura = await this.formController.model();
    if (factura.id) {
      // Para añadir nuevos albaranes del mismo cliente al editar
      this.where.cliente = { id: factura.cliente.id };
    }
    await this.formController.patched();
    // A partir de ahora escuchamos cambios de cliente
    this.formController
      .getFormGroup()
      .controls[Albaran.entity.CLIENTE].valueChanges.subscribe(
        (cliente: Cliente) => {
          if (this._currentCliente?.id !== cliente?.id) {
            this.ngControl.control.reset();
            this.notIn = [];
          }
          this._currentCliente = cliente;
          if (cliente) {
            this.where.cliente = { id: cliente.id };
          } else {
            delete this.where.cliente;
          }
          this.where = { ...this.where };
        }
      );
  }

  agregarAlbaran(albaran: Albaran) {
    const current: Albaran[] = this.ngControl.control.value;
    current.push(albaran);
    this.ngControl.control.setValue(current);
    this.albaranSeleccionado = undefined;
  }

  async crearNuevoAlbaran() {
    const resultado = await this.formWindowService.openRoute<Albaran>({
      path: ["facturacion", "albaran", "form"],
      aocUiWindowDynConfig: {
        parentWindowNumber: this.windowDynRef?.windowNumber,
      },
      aocFormConfig: {
        persistToDatabase: true,
        dynamicFormGroup: {
          [Albaran.entity.CLIENTE]: {
            value: this._currentCliente,
            state: "disabled",
            when: "beforeModelReady",
          },
        },
      },
    });
    if (resultado.type === "save") {
      this.agregarAlbaran(resultado.model);
    }
  }

  onModelChange(event: AocGridFieldModelEvent<Albaran>) {
    if (event.type === "add") {
      this.notIn.push(event.model.id);
      this.where = { ...this.where };
    } else if (event.type === "remove") {
      const index = this.notIn.indexOf(event.model.id);
      this.notIn.splice(index, 1);
      this.where = { ...this.where };
    }
  }
}
