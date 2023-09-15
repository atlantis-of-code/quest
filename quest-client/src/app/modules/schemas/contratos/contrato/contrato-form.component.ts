import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContratoModelConfig } from '../../../../model-configs/contratos/contrato-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Contrato, TipoSuministroEnumType } from '../../../../models/contratos/contrato';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Subscription } from 'rxjs';
import { Cliente } from '../../../../models/clientes/cliente';
import { AocUiDataDropdown } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { Sector } from '../../../../models/common/sector';
import { Subsector } from '../../../../models/common/subsector';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { MavermaDefaultsService } from '../../../../services/maverma-defaults.service';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { ClienteSelectComponent } from '../../clientes/cliente/cliente-select.component';
import {
  EmbDatosFiscalesFormAsFieldComponent
} from '../../abstract/emb-datos-fiscales/emb-datos-fiscales-form-as-field.component';
import {
  EmbInfoContactoFormAsFieldComponent
} from '../../abstract/emb-info-contacto/emb-info-contacto-form-as-field.component';
import { EmbDireccionFormAsFieldComponent } from '../../abstract/emb-direccion/emb-direccion-form-as-field.component';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiDropdownModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-dropdown';
import { AlmacenSelectComponent } from '../../articulos/almacen/almacen-select.component';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { SectorSelectComponent } from '../../common/sector/sector-select.component';
import { SubsectorSelectComponent } from '../../common/subsector/subsector-select.component';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AparatoGridFieldComponent } from '../aparato/aparato-grid-field.component';
import { ContratoBombonaGridFieldComponent } from '../contrato-bombona/contrato-bombona-grid-field.component';
import { DescuentoGridFieldComponent } from '../descuento/descuento-grid-field.component';
import { EstacionDeServicioSelectComponent } from '../estacion-de-servicio/estacion-de-servicio-select.component';
import { RevisionGridFieldComponent } from '../revision/revision-grid-field.component';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  template: `
    <aoc-form [modelConfig]="modelConfig" [formGroup]="formGroup" [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Datos generales">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Datos cliente">
                <aoc-ui-form-row>
                  <app-cliente-select aocUiFormField="Cliente" [formControlName]="ContratoClass.entity.CLIENTE"></app-cliente-select>
                </aoc-ui-form-row>
                <app-emb-datos-fiscales-form-as-field aocUiFormField
                                                      [formGroupName]="ContratoClass.entity.DATOS_FISCALES"></app-emb-datos-fiscales-form-as-field>
                <app-emb-info-contacto-form-as-field aocUiFormField
                                                     [formGroupName]="ContratoClass.embedded.EMB_INFO_CONTACTO"></app-emb-info-contacto-form-as-field>
                <aoc-ui-form-fieldset title="Dirección fiscal">
                  <app-emb-direccion-form-as-field aocUiFormField
                                                   [formGroupName]="ContratoClass.entity.DIRECCION_FISCAL"></app-emb-direccion-form-as-field>
                </aoc-ui-form-fieldset>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Datos generales póliza">
                <aoc-ui-form-row>
                  <input type="checkbox" aocUiInputCheckbox aocUiFormField="Firmado" [span]="4"
                         [formControlName]="ContratoClass.field.FIRMADO">
                  <input aocUiInputText aocUiFormField="Número póliza" [span]="6"
                         [formControlName]="ContratoClass.field.NUMERO_POLIZA">
                  <aoc-ui-dropdown aocUiFormField="Tipo suministro" [options]="tipoSuministroData" [span]="4"
                                   [formControlName]="ContratoClass.field.TIPO_SUMINISTRO"></aoc-ui-dropdown>
                  <app-almacen-select aocUiFormField="Almacén" [span]="10"
                                      [formControlName]="ContratoClass.entity.ALMACEN_GAS"></app-almacen-select>
                </aoc-ui-form-row>
                <aoc-ui-form-row>
                  <aoc-ui-datetime-picker aocUiFormField="Fecha alta"
                                          [formControlName]="ContratoClass.field.FECHA_ALTA"></aoc-ui-datetime-picker>
                  <aoc-ui-datetime-picker aocUiFormField="Fecha baja"
                                          [formControlName]="ContratoClass.field.FECHA_BAJA"></aoc-ui-datetime-picker>
                  <aoc-ui-dropdown aocUiFormField="Autocaravana/itinerante" [options]="vehiculoData"
                                   [formControlName]="ContratoClass.field.VEHICULO"></aoc-ui-dropdown>
                  <input aocUiInputText aocUiFormField="Matrícula" [formControlName]="ContratoClass.field.MATRICULA">
                </aoc-ui-form-row>
                <aoc-ui-form-row>
                  <app-sector-select aocUiFormField="Sector" [span]="6" [aocEmitter]="sectorEmitter"
                                     [formControlName]="ContratoClass.entity.SECTOR"></app-sector-select>
                  <app-subsector-select aocUiFormField="Subsector" [span]="6" [aocListener]="subsectorListener"
                                        [formControlName]="ContratoClass.entity.SUBSECTOR"></app-subsector-select>
                  <app-estacion-de-servicio-select aocUiFormField="Estación de servicio" [span]="12"
                                                   [formControlName]="ContratoClass.entity.ESTACION_DE_SERVICIO"></app-estacion-de-servicio-select>
                </aoc-ui-form-row>
                <aoc-ui-form-row>
                  <input aocUiInputText aocUiFormField="Persona contacto"
                         [formControlName]="ContratoClass.field.PERSONA_CONTACTO">
                </aoc-ui-form-row>
              </aoc-ui-form-fieldset>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>

          <aoc-ui-tab-panel-content header="Bombonas / Aparatos / Descuentos">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-contrato-bombona-grid-field aocUiFormField="Bombonas"
                                                 [formControlName]="ContratoClass.collection.CONTRATO_BOMBONA"></app-contrato-bombona-grid-field>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-aparato-grid-field aocUiFormField="Aparatos"
                                        [formControlName]="ContratoClass.collection.APARATO"></app-aparato-grid-field>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-descuento-grid-field aocUiFormField="Descuentos"
                                          [formControlName]="ContratoClass.collection.DESCUENTO"></app-descuento-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>

          <aoc-ui-tab-panel-content header="Revisiones">
            <aoc-ui-form-page>
              <aoc-ui-form-row>
                <aoc-ui-datetime-picker aocUiFormField="Fecha próxima revision" [span]="6"
                                        [formControlName]="ContratoClass.field.FECHA_PROXIMA_REVISION"></aoc-ui-datetime-picker>
                <aoc-ui-datetime-picker aocUiFormField="Fecha vencimiento revision" [span]="6"
                                        [formControlName]="ContratoClass.field.FECHA_VENCIMIENTO_REVISION"></aoc-ui-datetime-picker>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-revision-grid-field aocUiFormField="Lista de revisiones"
                                         [formControlName]="ContratoClass.collection.REVISION"></app-revision-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>

          <aoc-ui-tab-panel-content header="Direcciones suministro/correspondencia">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Dirección suministro">
                <app-emb-direccion-form-as-field aocUiFormField
                                                 [formGroupName]="ContratoClass.entity.DIRECCION_SUMINISTRO"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Dirección correspondencia">
                <app-emb-direccion-form-as-field aocUiFormField
                                                 [formGroupName]="ContratoClass.entity.DIRECCION_CORRESPONDENCIA"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>

          <aoc-ui-tab-panel-content header="Pagador alternativo">
            <aoc-ui-form-page>
              <app-emb-datos-fiscales-form-as-field aocUiFormField
                                                    [formGroupName]="ContratoClass.entity.PAGADOR_ALTERNATIVO_DATOS_FISCALES"></app-emb-datos-fiscales-form-as-field>
              <app-emb-direccion-form-as-field aocUiFormField
                                               [formGroupName]="ContratoClass.entity.PAGADOR_ALTERNATIVO_DIRECCION"></app-emb-direccion-form-as-field>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>

          <aoc-ui-tab-panel-content header="Ficheros">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Ficheros"
                  [claseReferencia]="ContratoClass"
                  directorio="contratos"
                  [formControlName]="ContratoClass.collection.FICHERO"
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
    ClienteSelectComponent,
    EmbDatosFiscalesFormAsFieldComponent,
    EmbInfoContactoFormAsFieldComponent,
    EmbDireccionFormAsFieldComponent,
    AocUiInputCheckboxModule,
    AocUiDropdownModule,
    AlmacenSelectComponent,
    AocUiDatetimePickerModule,
    SectorSelectComponent,
    SubsectorSelectComponent,
    EstacionDeServicioSelectComponent,
    AocUiInputTextModule,
    ContratoBombonaGridFieldComponent,
    AparatoGridFieldComponent,
    DescuentoGridFieldComponent,
    RevisionGridFieldComponent,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class ContratoFormComponent implements OnInit, OnDestroy {
  ContratoClass = Contrato;

  formGroup: UntypedFormGroup;

  clienteSubscription: Subscription;

  restOptions: AocRestOptions<Contrato> = {
    populate: {
      cliente: true,
      datosFiscales: true,
      direccionCorrespondencia: true,
      direccionFiscal: true,
      direccionSuministro: true,
      pagadorAlternativoDatosFiscales: true,
      pagadorAlternativoDireccion: true,
      sector: true,
      subsector: true,
      almacenGas: true,
      contratoBombonaCollection: {
        bombona: true
      },
      aparatoCollection: true,
      descuentoCollection: {
        bombona: true
      },
      revisionCollection: true,
      ficheroCollection: true,
    }
  };

  tipoSuministroData: AocUiDataDropdown = [
    {
      label: 'Domiciliario',
      value: 'Domiciliario'
    },
    {
      label: 'No domiciliario',
      value: 'No domiciliario'
    }
  ];

  vehiculoData: AocUiDataDropdown = [
    {
      label: 'Autocaravana',
      value: 'Autocaravana'
    },
    {
      label: 'Itinerante',
      value: 'Itinerante'
    }
  ];

  sectorEmitter = new AocModelEmitter<Sector>();

  subsectorListener = new AocModelListener<Subsector>([
    {
      type: 'filter query',
      emitter: this.sectorEmitter,
      filterQuery: aocSetId('sector')
    }
  ]);

  tipoSuministroSubscription: Subscription;

  constructor(
    public modelConfig: ContratoModelConfig,
    private fb: UntypedFormBuilder,
    private aocFormController: AocFormController<Contrato>,
    private mavermaUtils: MavermaUtilsService,
    private mavermaDefaults: MavermaDefaultsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Contrato.field.FIRMADO]: [false],
      [Contrato.field.NUMERO_POLIZA]: [null],
      [Contrato.field.TIPO_SUMINISTRO]: ['Domiciliario', Validators.required],
      [Contrato.field.FECHA_ALTA]: [new Date()],
      [Contrato.field.FECHA_BAJA]: [null],
      [Contrato.field.FECHA_PROXIMA_REVISION]: [null],
      [Contrato.field.FECHA_VENCIMIENTO_REVISION]: [null],
      [Contrato.field.VEHICULO]: [],
      [Contrato.field.MATRICULA]: [],
      [Contrato.field.PERSONA_CONTACTO]: [],
      [Contrato.entity.DATOS_FISCALES]: this.mavermaUtils.addEmbDatosFiscalesControls(true),
      [Contrato.embedded.EMB_INFO_CONTACTO]: this.mavermaUtils.addEmbInfoContactoControls(),
      [Contrato.entity.CLIENTE]: [null, Validators.required],
      [Contrato.entity.DIRECCION_CORRESPONDENCIA]: this.mavermaUtils.addEmbDireccionControls(),
      [Contrato.entity.DIRECCION_SUMINISTRO]: this.mavermaUtils.addEmbDireccionControls(),
      [Contrato.entity.DIRECCION_FISCAL]: this.mavermaUtils.addEmbDireccionControls(),
      [Contrato.entity.PAGADOR_ALTERNATIVO_DATOS_FISCALES]: this.mavermaUtils.addEmbDatosFiscalesControls(false),
      [Contrato.entity.PAGADOR_ALTERNATIVO_DIRECCION]: this.mavermaUtils.addEmbDireccionControls(),
      [Contrato.entity.SECTOR]: [null],
      [Contrato.entity.SUBSECTOR]: [null],
      [Contrato.entity.ALMACEN_GAS]: [this.mavermaDefaults.almacenGas, Validators.required],
      [Contrato.entity.ESTACION_DE_SERVICIO]: [{value: null, disabled: true}],
      [Contrato.collection.CONTRATO_BOMBONA]: [[]],
      [Contrato.collection.APARATO]: [[]],
      [Contrato.collection.DESCUENTO]: [[]],
      [Contrato.collection.REVISION]: [[]],
      [Contrato.collection.FICHERO]: [[]]
    });
    // Tipo suministro will enable/disable estación de servicio depending on its value
    const estacionDeServicioControl = this.formGroup.controls[Contrato.entity.ESTACION_DE_SERVICIO]; // Capture pointer to control
    this.tipoSuministroSubscription = this.formGroup.controls[Contrato.field.TIPO_SUMINISTRO].valueChanges.subscribe((tipo: TipoSuministroEnumType) => {
      if (tipo === 'Domiciliario') {
        estacionDeServicioControl.setValue(null);
        estacionDeServicioControl.disable();
      } else {
        estacionDeServicioControl.enable();
      }
    });
    this.handleAocFormController().then();
  }

  async handleAocFormController() {
    const contrato = await this.aocFormController.model();
    const clienteControl = this.formGroup.controls[Contrato.entity.CLIENTE];
    // Cannot change cliente on contrato with id
    if (contrato.id) {
      clienteControl.disable();
    } else {
      // No id in contrato and value on cliente, this comes from pre-selected cliente dependency
      if (clienteControl.value) {
        clienteControl.disable();
        this.patchCliente(clienteControl.value).then();
      } else {
        // New contrato from contrato grid (with no cliente pre-selected)
        this.clienteSubscription = clienteControl.valueChanges.subscribe((cliente: Cliente) => {
          this.patchCliente(cliente).then();
        });
      }
    }
  }

  private async patchCliente(cliente: Cliente) {
    let populatedCliente = cliente;
    /*if (cliente?.id) {
      populatedCliente = await this.rest.findOne(Cliente, {id: cliente.id}, {
        populate: {
          [Cliente.entity.SECTOR]: true,
          [Cliente.entity.SUBSECTOR]: true
        }
      });
    }*/
    // Delete ids to create new relations
    // this.formGroup.controls[Contrato.entity.SECTOR].setValue(populatedCliente?.sector);
    // this.formGroup.controls[Contrato.entity.SUBSECTOR].setValue(populatedCliente?.subsector);
    this.formGroup.controls[Contrato.embedded.EMB_INFO_CONTACTO].setValue(populatedCliente?.embInfoContacto);
    this.formGroup.controls[Contrato.entity.DATOS_FISCALES].patchValue(populatedCliente?.embDatosFiscales);
    this.formGroup.controls[Contrato.entity.DIRECCION_CORRESPONDENCIA].patchValue(populatedCliente?.embDireccion);
    this.formGroup.controls[Contrato.entity.DIRECCION_FISCAL].patchValue(populatedCliente?.embDireccion);
    this.formGroup.controls[Contrato.entity.DIRECCION_SUMINISTRO].patchValue(populatedCliente?.embDireccion);
  }

  ngOnDestroy() {
    this.clienteSubscription?.unsubscribe();
    this.tipoSuministroSubscription?.unsubscribe();
    this.sectorEmitter.complete();
    this.subsectorListener.complete();
  }
}
