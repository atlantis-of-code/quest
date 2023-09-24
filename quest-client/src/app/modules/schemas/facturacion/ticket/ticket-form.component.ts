import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TicketModelConfig } from '../../../../model-configs/facturacion/ticket-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ticket } from '../../../../models/facturacion/ticket';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { LineaAlbaranModelConfig } from '../../../../model-configs/facturacion/linea-albaran-model-config';
import { Subscription } from 'rxjs';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { Big } from 'big.js';
import { Cliente } from '../../../../models/clientes/cliente';
import { MavermaDefaultsService } from '../../../../services/maverma-defaults.service';
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
  selector: 'app-ticket-form',
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
              <app-emb-documento-form-as-field
                docLabel="TICKET"
              ></app-emb-documento-form-as-field>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-emb-linea-documento-grid-field
                  aocUiFormField="Líneas asociadas"
                  [formControlName]="TicketClass.collection.LINEA_ALBARAN"
                  [modelConfig]="lineaAlbaranModelConfig"
                ></app-emb-linea-documento-grid-field>
              </aoc-ui-form-row>
              <app-emb-documento-totales
                [formGroup]="formGroup"
                [modelosConBase]="formGroup.controls[TicketClass.collection.LINEA_ALBARAN].value"
                [iva]="formGroup.controls[TicketClass.field.IVA].value"
              ></app-emb-documento-totales>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Direcciones/Observaciones">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Dirección fiscal del cliente">
                <app-emb-direccion-form-as-field aocUiFormField
                                                 [formGroupName]="TicketClass.entity.DIRECCION_FISCAL"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Dirección de obra">
                <app-emb-direccion-form-as-field
                  aocUiFormField [formGroupName]="TicketClass.entity.DIRECCION_OBRA"
                  [activarCopiaCliente]="true"
                  [cliente]="formGroup.controls[TicketClass.entity.CLIENTE].value"
                ></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <textarea aocUiTextarea aocUiFormField="Observaciones"
                          [formControlName]="TicketClass.field.OBSERVACIONES"></textarea>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Ficheros asociados">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Ficheros"
                  [claseReferencia]="TicketClass"
                  directorio="tickets"
                  [formControlName]="TicketClass.collection.FICHERO"
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
    AocUiTabPanelModule,
    AocUiFormModule,
    ReactiveFormsModule,
    EmbDocumentoFormAsFieldComponent,
    EmbLineaDocumentoGridFieldComponent,
    EmbDocumentoTotalesComponent,
    EmbDireccionFormAsFieldComponent,
    AocUiTextareaModule,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class TicketFormComponent implements OnInit, OnDestroy {
  TicketClass = Ticket;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Ticket> = {
    populate: {
      direccionObra: true,
      direccionFiscal: true,
      cliente: true,
      anyoFiscal: true,
      ficheroCollection: true,
      lineaAlbaranCollection: {
        articulo: true
      }
    }
  };

  private clienteSubscription: Subscription;
  private totalSubscription: Subscription;

  constructor(
    public modelConfig: TicketModelConfig,
    public lineaAlbaranModelConfig: LineaAlbaranModelConfig,
    private fb: UntypedFormBuilder,
    private mavermaUtils: QuestUtilsService,
    private restService: AocRestService,
    private formController: AocFormController<Ticket>,
    private mavermaDefaults: MavermaDefaultsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      [Ticket.field.OBSERVACIONES]: [null],
      [Ticket.entity.DIRECCION_FISCAL]: this.mavermaUtils.addEmbDireccionControls(new UntypedFormGroup({})),
      [Ticket.entity.DIRECCION_OBRA]: this.mavermaUtils.addEmbDireccionControls(new UntypedFormGroup({})),
      [Ticket.collection.LINEA_ALBARAN]: [[]],
      [Ticket.collection.FICHERO]: [[]]
    });
    this.mavermaUtils.addEmbDocumentoControls(this.formGroup, false);

    this.totalSubscription = this.formGroup.controls[Ticket.field.TOTAL]
      .valueChanges
      .subscribe((total: string) => {
        const clienteControl = this.formGroup.controls[Ticket.entity.CLIENTE];
        if (Big(total ?? '0.00').gt(this.mavermaDefaults.empresa.maximo_cliente_anonimo)) {
          if (!clienteControl.hasValidator(Validators.required)) {
            clienteControl.addValidators(Validators.required);
            clienteControl.updateValueAndValidity();
            this.cd.detectChanges();
          }
        } else {
          if (clienteControl.hasValidator(Validators.required)) {
            clienteControl.removeValidators(Validators.required);
            clienteControl.updateValueAndValidity();
            this.cd.detectChanges();
          }
        }
      });
    this.handleFormController().then();
  }

  async handleFormController() {
    await this.formController.patched();
    this.clienteSubscription = this.formGroup.controls[Ticket.entity.CLIENTE].valueChanges.subscribe((cliente: Cliente) => {
      if (cliente) {
        this.formGroup.controls[Ticket.entity.DIRECCION_FISCAL].patchValue(cliente.embDireccion);
      } else {
        this.formGroup.controls[Ticket.entity.DIRECCION_FISCAL].reset();
      }
      this.formGroup.controls[Ticket.entity.DIRECCION_OBRA].reset();
    });
  }

  ngOnDestroy() {
    this.clienteSubscription.unsubscribe();
    this.totalSubscription.unsubscribe();
  }
}
