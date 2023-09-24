import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbaranModelConfig } from '../../../../model-configs/facturacion/albaran-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Albaran } from '../../../../models/facturacion/albaran';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cliente } from '../../../../models/clientes/cliente';
import { LineaAlbaranModelConfig } from '../../../../model-configs/facturacion/linea-albaran-model-config';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
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
import { TecnicoSelectComponent } from '../../tecnicos/tecnico/tecnico-select.component';

@Component({
  selector: 'app-albaran-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Datos generales">
            <aoc-ui-form-page>
              <app-emb-documento-form-as-field docLabel="ALBARÁN"></app-emb-documento-form-as-field>
              <aoc-ui-form-row>
                <app-tecnico-select aocUiFormField="Técnico"
                                    [formControlName]="AlbaranClass.entity.TECNICO"></app-tecnico-select>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-emb-linea-documento-grid-field
                  aocUiFormField="Líneas"
                  [modelConfig]="lineaAlbaranModelConfig"
                  [formControlName]="AlbaranClass.collection.LINEA_ALBARAN"
                  [tecnico]="formGroup.controls[AlbaranClass.entity.TECNICO].value"
                ></app-emb-linea-documento-grid-field>
              </aoc-ui-form-row>
              <app-emb-documento-totales
                [formGroup]="formGroup"
                [modelosConBase]="formGroup.controls[AlbaranClass.collection.LINEA_ALBARAN].value"
                [iva]="formGroup.controls[AlbaranClass.field.IVA].value"
              ></app-emb-documento-totales>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Direcciones/Observaciones">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Dirección fiscal del cliente">
                <app-emb-direccion-form-as-field aocUiFormField
                                                 [formGroupName]="AlbaranClass.entity.DIRECCION_FISCAL"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Dirección de obra">
                <app-emb-direccion-form-as-field
                  aocUiFormField [formGroupName]="AlbaranClass.entity.DIRECCION_OBRA"
                  [activarCopiaCliente]="true"
                  [cliente]="formGroup.controls[AlbaranClass.entity.CLIENTE].value"
                ></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <textarea aocUiTextarea aocUiFormField="Observaciones"
                          [formControlName]="AlbaranClass.field.OBSERVACIONES"></textarea>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Ficheros asociados">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Ficheros"
                  [claseReferencia]="AlbaranClass"
                  directorio="albaranes"
                  [formControlName]="AlbaranClass.collection.FICHERO"
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
    TecnicoSelectComponent,
    EmbLineaDocumentoGridFieldComponent,
    EmbDocumentoTotalesComponent,
    EmbDireccionFormAsFieldComponent,
    FicheroGridFieldComponent,
    AocUiTextareaModule
  ],
  providers: [AocFormController]
})
export default class AlbaranFormComponent implements OnInit, OnDestroy {
  AlbaranClass = Albaran;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Albaran> = {
    populate: {
      cliente: true,
      tecnico: true,
      anyoFiscal: true,
      lineaAlbaranCollection: {
        articulo: {
          categoria: true
        },
        almacen: true
      },
      direccionFiscal: true,
      direccionObra: true,
      ficheroCollection: true
    }
  };

  private unsubscriber = new Subject<void>();

  constructor(
    public modelConfig: AlbaranModelConfig,
    public lineaAlbaranModelConfig: LineaAlbaranModelConfig,
    private fb: UntypedFormBuilder,
    private aocFormController: AocFormController<Albaran>,
    private mavermaUtils: QuestUtilsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Albaran.field.OBSERVACIONES]: [null],
      [Albaran.collection.LINEA_ALBARAN]: [[]],
      [Albaran.entity.DIRECCION_FISCAL]: this.mavermaUtils.addEmbDireccionControls(),
      [Albaran.entity.DIRECCION_OBRA]: this.mavermaUtils.addEmbDireccionControls(),
      [Albaran.entity.TECNICO]: [],
      [Albaran.collection.FICHERO]: [[]]
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
    this.formGroup.controls[Albaran.entity.CLIENTE].valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((cliente: Cliente) => {
      if (cliente) {
        this.formGroup.controls[Albaran.entity.DIRECCION_FISCAL].patchValue(cliente.embDireccion);
      } else {
        this.formGroup.controls[Albaran.entity.DIRECCION_FISCAL].reset();
      }
      this.formGroup.controls[Albaran.entity.DIRECCION_OBRA].reset();
    });
  }
}
