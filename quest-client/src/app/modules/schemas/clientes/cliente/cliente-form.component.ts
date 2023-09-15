import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClienteModelConfig } from '../../../../model-configs/clientes/cliente-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../../models/clientes/cliente';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocUiDataDropdown } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocModelEmitter, AocModelListener, aocSetId } from '@atlantis-of-code/aoc-client/core/utils';
import { Sector } from '../../../../models/common/sector';
import { Subsector } from '../../../../models/common/subsector';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiDropdownModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-dropdown';
import {
  EmbDatosFiscalesFormAsFieldComponent
} from '../../abstract/emb-datos-fiscales/emb-datos-fiscales-form-as-field.component';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { EmbDireccionFormAsFieldComponent } from '../../abstract/emb-direccion/emb-direccion-form-as-field.component';
import {
  EmbInfoContactoFormAsFieldComponent
} from '../../abstract/emb-info-contacto/emb-info-contacto-form-as-field.component';
import { SectorSelectComponent } from '../../common/sector/sector-select.component';
import { SubsectorSelectComponent } from '../../common/subsector/subsector-select.component';
import { ContactoGridFieldComponent } from '../../contactos/contacto/contacto-grid-field.component';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Datos de cliente">
            <aoc-ui-form-page>
              <aoc-ui-form-row>
                <input aocUiInputText aocUiFormField="Código" [span]="4" aocUiValueAsNumber
                       [formControlName]="ClienteClass.field.CODIGO">
                <input aocUiInputText aocUiFormField="Nombre comercial"
                       [formControlName]="ClienteClass.field.NOMBRE_COMERCIAL">
                <aoc-ui-dropdown aocUiFormField="Idioma" [span]="4" [options]="idiomaItems"
                                 [formControlName]="ClienteClass.field.IDIOMA"></aoc-ui-dropdown>
              </aoc-ui-form-row>
              <app-emb-datos-fiscales-form-as-field aocUiFormField
                                                    [formGroupName]="ClienteClass.embedded.EMB_DATOS_FISCALES"></app-emb-datos-fiscales-form-as-field>
              <aoc-ui-form-row>
                <app-sector-select aocUiFormField="Sector" [span]="8" [aocEmitter]="sectorEmitter"
                                   [formControlName]="ClienteClass.entity.SECTOR"></app-sector-select>
                <app-subsector-select aocUiFormField="Subsector" [span]="8" [aocListener]="subsectorListener"
                                      [formControlName]="ClienteClass.entity.SUBSECTOR"></app-subsector-select>
                <aoc-ui-dropdown aocUiFormField="Sexo" [span]="4" [options]="sexoItems"
                                 [formControlName]="ClienteClass.field.SEXO"></aoc-ui-dropdown>
                <aoc-ui-datetime-picker aocUiFormField="Fecha nacimiento" [span]="4"
                                        [formControlName]="ClienteClass.field.FECHA_NACIMIENTO"></aoc-ui-datetime-picker>
              </aoc-ui-form-row>
              <aoc-ui-form-fieldset title="Dirección fiscal">
                <app-emb-direccion-form-as-field aocUiFormField
                                                 [formGroupName]="ClienteClass.embedded.EMB_DIRECCION"></app-emb-direccion-form-as-field>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Contacto" aocUiFormRowHeight>
                <app-emb-info-contacto-form-as-field aocUiFormField
                                                     [formGroupName]="ClienteClass.embedded.EMB_INFO_CONTACTO"></app-emb-info-contacto-form-as-field>
                <aoc-ui-form-row aocUiFormRowHeight>
                  <app-contacto-grid-field aocUiFormField="Contactos adicionales"
                                           [formControlName]="ClienteClass.collection.CONTACTO"></app-contacto-grid-field>
                </aoc-ui-form-row>
              </aoc-ui-form-fieldset>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Ficheros">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Ficheros"
                  [claseReferencia]="ClienteClass"
                  directorio="clientes"
                  [formControlName]="ClienteClass.collection.FICHERO"
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
    AocUiInputTextModule,
    AocUiDropdownModule,
    EmbDatosFiscalesFormAsFieldComponent,
    SectorSelectComponent,
    SubsectorSelectComponent,
    AocUiDatetimePickerModule,
    EmbDireccionFormAsFieldComponent,
    EmbInfoContactoFormAsFieldComponent,
    ContactoGridFieldComponent,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class ClienteFormComponent implements OnInit, OnDestroy {
  ClienteClass = Cliente;

  restOptions: AocRestOptions<Cliente> = {
    populate: {
      sector: true,
      subsector: true,
      contactoCollection: true,
      ficheroCollection: true
    }
  };

  formGroup: UntypedFormGroup;

  idiomaItems: AocUiDataDropdown = [
    {
      label: 'Español',
      value: 'Español'
    },
    {
      label: 'Inglés',
      value: 'Inglés'
    }
  ];

  sexoItems: AocUiDataDropdown = [
    {
      label: 'Hombre',
      value: 'Hombre'
    },
    {
      label: 'Mujer',
      value: 'Mujer'
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

  constructor(
    public modelConfig: ClienteModelConfig,
    private fb: UntypedFormBuilder,
    private aocFormController: AocFormController<Cliente>,
    private mavermaUtils: MavermaUtilsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Cliente.field.CODIGO]: [null, AocUiValidators.positiveNumber(0)],
      [Cliente.field.NOMBRE_COMERCIAL]: [null],
      [Cliente.field.IDIOMA]: ['Español'],
      [Cliente.field.SEXO]: ['Hombre'],
      [Cliente.field.FECHA_NACIMIENTO]: [null],
      [Cliente.embedded.EMB_DATOS_FISCALES]: this.mavermaUtils.addEmbDatosFiscalesControls(true),
      [Cliente.embedded.EMB_DIRECCION]: this.mavermaUtils.addEmbDireccionControls(),
      [Cliente.embedded.EMB_INFO_CONTACTO]: this.mavermaUtils.addEmbInfoContactoControls(),
      [Cliente.entity.SECTOR]: [null],
      [Cliente.entity.SUBSECTOR]: [null],
      [Cliente.collection.CONTACTO]: [[]],
      [Cliente.collection.FICHERO]: [[]]
    });
    this.handleFormController().then();
  }

  ngOnDestroy() {
    this.sectorEmitter.complete();
    this.subsectorListener.complete();
  }

  async handleFormController() {
    const cliente = await this.aocFormController.model();
    if (cliente.id) {
      this.formGroup.controls[Cliente.field.CODIGO].addValidators(Validators.required);
      this.formGroup.controls[Cliente.field.CODIGO].updateValueAndValidity();
    }
  }
}
