import { Component, OnInit } from '@angular/core';
import { EmpresaModelConfig } from '../../../../model-configs/configuracion/empresa-model-config';
import { Empresa } from '../../../../models/configuracion/empresa';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  EmbDatosFiscalesFormAsFieldComponent
} from '../../abstract/emb-datos-fiscales/emb-datos-fiscales-form-as-field.component';
import { EmbDireccionFormAsFieldComponent } from '../../abstract/emb-direccion/emb-direccion-form-as-field.component';
import {
  EmbInfoContactoFormAsFieldComponent
} from '../../abstract/emb-info-contacto/emb-info-contacto-form-as-field.component';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-fieldset title="Datos fiscales">
            <app-emb-datos-fiscales-form-as-field
              aocUiFormField
              [formGroupName]="EmpresaClass.embedded.EMB_DATOS_FISCALES"
              [esconderApellidos]="true"
            ></app-emb-datos-fiscales-form-as-field>
          </aoc-ui-form-fieldset>
          <aoc-ui-form-fieldset title="Dirección">
            <app-emb-direccion-form-as-field
              aocUiFormField
              [formGroupName]="EmpresaClass.embedded.EMB_DIRECCION"
            ></app-emb-direccion-form-as-field>
          </aoc-ui-form-fieldset>
          <aoc-ui-form-fieldset title="Contacto">
            <app-emb-info-contacto-form-as-field
              aocUiFormField
              [formGroupName]="EmpresaClass.embedded.EMB_INFO_CONTACTO">
            </app-emb-info-contacto-form-as-field>
          </aoc-ui-form-fieldset>
          <aoc-ui-form-fieldset title="Configuración de facturas y tickets">
            <aoc-ui-form-row>
              <input aocUiInputText aocUiFormField="IVA (%)" [span]="4" [formControlName]="EmpresaClass.field.IVA">
              <input aocUiInputText aocUiFormField="Serie actual en facturas" [span]="6"
                     [formControlName]="EmpresaClass.field.SERIE_ACTUAL_FACTURAS">
              <input aocUiInputText aocUiFormField="Máximo en tickets anónimos (€)" [span]="6"
                     [formControlName]="EmpresaClass.field.MAXIMO_CLIENTE_ANONIMO">
            </aoc-ui-form-row>
          </aoc-ui-form-fieldset>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    EmbDatosFiscalesFormAsFieldComponent,
    EmbDireccionFormAsFieldComponent,
    EmbInfoContactoFormAsFieldComponent,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class EmpresaFormComponent implements OnInit {
  EmpresaClass = Empresa;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: EmpresaModelConfig,
    private fb: UntypedFormBuilder,
    private mavermaUtils: QuestUtilsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Empresa.field.IVA]: ['0.00', [Validators.required, AocUiValidators.positiveNumber(2)]],
      [Empresa.field.SERIE_ACTUAL_FACTURAS]: [null],
      [Empresa.field.MAXIMO_CLIENTE_ANONIMO]: [null, [Validators.required, AocUiValidators.positiveNumber()]],
      [Empresa.embedded.EMB_DATOS_FISCALES]: this.mavermaUtils.addEmbDatosFiscalesControls(true),
      [Empresa.embedded.EMB_INFO_CONTACTO]: this.mavermaUtils.addEmbInfoContactoControls(),
      [Empresa.embedded.EMB_DIRECCION]: this.mavermaUtils.addEmbDireccionControls()
    });
  }
}
