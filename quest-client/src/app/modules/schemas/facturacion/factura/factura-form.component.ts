import { Component, OnDestroy, OnInit } from '@angular/core';
import { FacturaModelConfig } from '../../../../model-configs/facturacion/factura-model-config';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Factura } from '../../../../models/facturacion/factura';
import { Subject, takeUntil } from 'rxjs';
import { Cliente } from '../../../../models/clientes/cliente';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { Albaran } from '../../../../models/facturacion/albaran';
import { Tecnico } from '../../../../models/tecnicos/tecnico';
import { MavermaDefaultsService } from '../../../../services/maverma-defaults.service';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { EmbDocumentoFormAsFieldComponent } from '../../abstract/emb-documento/emb-documento-form-as-field.component';
import { AlbaranGridFieldComponent } from '../albaran/albaran-grid-field.component';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { EmbDocumentoTotalesComponent } from '../../abstract/emb-documento/emb-documento-totales.component';
import { EmbDireccionFormAsFieldComponent } from '../../abstract/emb-direccion/emb-direccion-form-as-field.component';
import { AocUiTextareaModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-textarea';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';
import { TecnicoSelectComponent } from '../../tecnicos/tecnico/tecnico-select.component';

@Component({
  selector: 'app-factura-form',
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
              <app-emb-documento-form-as-field [formGroup]="formGroup"
                                               docLabel="FACTURA"></app-emb-documento-form-as-field>
              <aoc-ui-form-row>
                <app-tecnico-select aocUiFormField="Técnico"
                                    [formControlName]="FacturaClass.entity.TECNICO"></app-tecnico-select>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-albaran-grid-field
                  aocUiFormField="Albaranes asociados"
                  [formControlName]="FacturaClass.collection.ALBARAN"
                  [cliente]="formGroup.controls[FacturaClass.entity.CLIENTE].value"
                ></app-albaran-grid-field>
              </aoc-ui-form-row>
              <app-emb-documento-totales
                [formGroup]="formGroup"
                [modelosConBase]="formGroup.controls[FacturaClass.collection.ALBARAN].value"
                [iva]="formGroup.controls[FacturaClass.field.IVA].value"
              ></app-emb-documento-totales>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Direcciones/Observaciones">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Dirección fiscal del cliente">
                <app-emb-direccion-form-as-field
                  [formGroupName]="FacturaClass.entity.DIRECCION_FISCAL"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Dirección de obra">
                <app-emb-direccion-form-as-field
                  [formGroupName]="FacturaClass.entity.DIRECCION_OBRA"
                  [activarCopiaCliente]="true"
                  [cliente]="formGroup.controls[FacturaClass.entity.CLIENTE].value"
                ></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <textarea aocUiTextarea aocUiFormField="Observaciones"
                          [formControlName]="FacturaClass.field.OBSERVACIONES"></textarea>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Ficheros asociados">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Ficheros"
                  [claseReferencia]="FacturaClass"
                  directorio="facturas"
                  [formControlName]="FacturaClass.collection.FICHERO"
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
    EmbDocumentoFormAsFieldComponent,
    TecnicoSelectComponent,
    AlbaranGridFieldComponent,
    AocUiFormModule,
    EmbDocumentoTotalesComponent,
    EmbDireccionFormAsFieldComponent,
    AocUiTextareaModule,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class FacturaFormComponent implements OnInit, OnDestroy {
  FacturaClass = Factura;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Factura> = {
    populate: {
      cliente: true,
      tecnico: true,
      anyoFiscal: true,
      direccionFiscal: true,
      direccionObra: true,
      ficheroCollection: true,
      albaranCollection: {
        anyoFiscal: true,
        tecnico: true,
        cliente: true,
        direccionObra: true,
        direccionFiscal: true,
        ficheroCollection: true,
        lineaAlbaranCollection: {
          articulo: true
        }
      }
    }
  };

  private unsubscriber = new Subject<void>();

  constructor(
    public modelConfig: FacturaModelConfig,
    private fb: UntypedFormBuilder,
    private formController: AocFormController<Factura>,
    private restService: AocRestService,
    private mavermaUtils: MavermaUtilsService,
    private mavermaDefaultsService: MavermaDefaultsService
  ) { }

  ngOnInit(): void {
    const validadorSobreElNumeroDeAlbaranes = (control: AbstractControl) => {
      const albaranes: Albaran[] = (control.value ?? []).filter(a => !a.isMarkedForDeletion());
      if (!albaranes.length) {
        return { ['La factura tiene que tener como mínimo un albarán asociado']: true}
      }
      return null;
    }
    this.formGroup = this.fb.group({
      [Factura.field.OBSERVACIONES]: [null],
      [Factura.entity.DIRECCION_OBRA]: this.mavermaUtils.addEmbDireccionControls(),
      [Factura.entity.DIRECCION_FISCAL]: this.mavermaUtils.addEmbDireccionControls(),
      [Factura.entity.TECNICO]: [],
      [Factura.collection.ALBARAN]: [[], validadorSobreElNumeroDeAlbaranes],
      [Factura.collection.FICHERO]: [[]]
    });
    this.mavermaUtils.addEmbDocumentoControls(this.formGroup);
    this.handleFormController().then();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  async handleFormController() {
    const factura = await this.formController.model();
    if (!factura.id) {
      this.formGroup.controls[Factura.field.SERIE].setValue(this.mavermaDefaultsService.empresa.serie_actual_facturas);
    } else {
      this.formGroup.controls[Factura.entity.CLIENTE].disable();
    }
    await this.formController.patched();
    this.formGroup.controls[Factura.entity.CLIENTE].valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((cliente: Cliente) => {
      if (cliente) {
        this.formGroup.controls[Factura.entity.DIRECCION_FISCAL].patchValue(cliente.embDireccion);
      } else {
        this.formGroup.controls[Factura.entity.DIRECCION_FISCAL].reset();
      }
      this.formGroup.controls[Factura.entity.DIRECCION_OBRA].reset();
    });
    this.formGroup.controls[Factura.entity.TECNICO].valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((tecnico: Tecnico) => {
      this.formGroup.controls[Factura.field.SERIE].setValue(tecnico?.serie_en_facturas ?? this.mavermaDefaultsService.empresa.serie_actual_facturas);
    });
  }
}
