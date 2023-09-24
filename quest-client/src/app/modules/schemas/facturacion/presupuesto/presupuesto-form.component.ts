import { Component, OnDestroy, OnInit } from '@angular/core';
import { PresupuestoModelConfig } from '../../../../model-configs/facturacion/presupuesto-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Presupuesto } from '../../../../models/facturacion/presupuesto';
import { LineaPresupuestoModelConfig } from '../../../../model-configs/facturacion/linea-presupuesto-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Cliente } from '../../../../models/clientes/cliente';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { Albaran } from '../../../../models/facturacion/albaran';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { EmbDocumentoFormAsFieldComponent } from '../../abstract/emb-documento/emb-documento-form-as-field.component';
import {
  EmbLineaDocumentoGridFieldComponent
} from '../../abstract/emb-linea-documento/emb-linea-documento-grid-field.component';
import { EmbDocumentoTotalesComponent } from '../../abstract/emb-documento/emb-documento-totales.component';
import { EmbDireccionFormAsFieldComponent } from '../../abstract/emb-direccion/emb-direccion-form-as-field.component';
import { AocUiTextareaModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-textarea';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';

@Component({
  selector: 'app-presupuesto-form',
  standalone: true,
  template: `
    <aoc-form
      [formGroup]="formGroup"
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Datos generales">
            <aoc-ui-form-page>
              <app-emb-documento-form-as-field [formGroup]="formGroup"
                                               docLabel="PRESUPUESTO"></app-emb-documento-form-as-field>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-emb-linea-documento-grid-field
                  aocUiFormField="Líneas"
                  [modelConfig]="lineaPresupuestoModelConfig"
                  [formControlName]="PresupuestoClass.collection.LINEA_PRESUPUESTO"
                  [gestionarAlmacen]="false"
                ></app-emb-linea-documento-grid-field>
              </aoc-ui-form-row>
              <app-emb-documento-totales
                [formGroup]="formGroup"
                [modelosConBase]="formGroup.controls[PresupuestoClass.collection.LINEA_PRESUPUESTO].value"
                [iva]="formGroup.controls[PresupuestoClass.field.IVA].value"
              ></app-emb-documento-totales>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Direcciones/Observaciones">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Direccion fiscal del cliente">
                <app-emb-direccion-form-as-field aocUiFormField
                                                 [formGroupName]="PresupuestoClass.entity.DIRECCION_FISCAL"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Direccion de obra">
                <app-emb-direccion-form-as-field
                  aocUiFormField
                  [formGroupName]="PresupuestoClass.entity.DIRECCION_OBRA"
                  [activarCopiaCliente]="true"
                  [cliente]="formGroup.controls[PresupuestoClass.entity.CLIENTE].value"
                ></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <textarea aocUiTextarea aocUiFormField="Observaciones"
                          [formControlName]="PresupuestoClass.field.OBSERVACIONES"></textarea>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Ficheros asociados">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Ficheros"
                  [claseReferencia]="PresupuestoClass"
                  directorio="presupuestos"
                  [formControlName]="PresupuestoClass.collection.FICHERO"
                ></app-fichero-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiTabPanelModule,
    AocUiFormModule,
    EmbDocumentoFormAsFieldComponent,
    EmbLineaDocumentoGridFieldComponent,
    EmbDocumentoTotalesComponent,
    EmbDireccionFormAsFieldComponent,
    AocUiTextareaModule,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class PresupuestoFormComponent implements OnInit, OnDestroy {
  PresupuestoClass = Presupuesto;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Presupuesto> = {
    populate: {
      cliente: true,
      anyoFiscal: true,
      lineaPresupuestoCollection: {
        articulo: {
          categoria: true
        }
      },
      direccionFiscal: true,
      direccionObra: true,
      ficheroCollection: true
    }
  }

  private unsubscriber = new Subject<void>();

  constructor(
    public modelConfig: PresupuestoModelConfig,
    public lineaPresupuestoModelConfig: LineaPresupuestoModelConfig,
    private fb: UntypedFormBuilder,
    private aocFormController: AocFormController<Presupuesto>,
    private mavermaUtils: QuestUtilsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Presupuesto.field.OBSERVACIONES]: [null],
      [Presupuesto.collection.LINEA_PRESUPUESTO]: [[]],
      [Presupuesto.entity.DIRECCION_FISCAL]: this.mavermaUtils.addEmbDireccionControls(),
      [Presupuesto.entity.DIRECCION_OBRA]: this.mavermaUtils.addEmbDireccionControls(),
      [Presupuesto.collection.FICHERO]: [[]]
    });
    this.mavermaUtils.addEmbDocumentoControls(this.formGroup);
    this.handleFormController().then();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  async handleFormController() {
    await this.aocFormController.patched();
    this.formGroup.controls[Presupuesto.entity.CLIENTE].valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((cliente: Cliente) => {
      if (cliente) {
        this.formGroup.controls[Presupuesto.entity.DIRECCION_FISCAL].patchValue(cliente.embDireccion);
      } else {
        this.formGroup.controls[Albaran.entity.DIRECCION_FISCAL].reset();
      }
      this.formGroup.controls[Albaran.entity.DIRECCION_OBRA].reset();
    });
  }
}
