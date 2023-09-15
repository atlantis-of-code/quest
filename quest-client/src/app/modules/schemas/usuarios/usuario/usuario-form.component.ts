import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioModelConfig } from '../../../../model-configs/usuarios/usuario-model-config';
import { Usuario } from '../../../../models/usuarios/usuario';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { NgIf } from '@angular/common';
import { GrupoGridFieldComponent } from '../grupo/grupo-grid-field.component';
import { AocUiInputGroupModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-group';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { RepartidorSelectComponent } from '../../pedidos/repartidor/repartidor-select.component';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { TecnicoSelectComponent } from '../../tecnicos/tecnico/tecnico-select.component';

@Component({
  standalone: true,
  selector: 'app-usuario-form',
  providers: [AocFormController],
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiInputTextModule,
    ReactiveFormsModule,
    NgIf,
    GrupoGridFieldComponent,
    AocUiInputGroupModule,
    AocUiButtonModule,
    TecnicoSelectComponent,
    RepartidorSelectComponent
  ],
  template: `
    <aoc-form [modelConfig]="modelConfig" [formGroup]="formGroup" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre de acceso" [formControlName]="UsuarioClass.field.NOMBRE">
            <aoc-ui-input-group aocUiFormRowElement="Contraseña">
              <input aocUiInputText [type]="passwordType" [formControlName]="UsuarioClass.field.CONTRASENYA" [placeholder]="contrasenyaPlaceholder">
              <button aocUiButton icon="visibility" (click)="swapPasswordType()"></button>
            </aoc-ui-input-group>
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre completo" [formControlName]="UsuarioClass.field.NOMBRE_COMPLETO">
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Correo electrónico" [formControlName]="UsuarioClass.field.MAIL">
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <app-tecnico-select aocUiFormField="Asociar a ficha de técnico" [formControlName]="UsuarioClass.entity.TECNICO"></app-tecnico-select>
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <app-repartidor-select aocUiFormField="Asociar a ficha de repartidor" [formControlName]="UsuarioClass.entity.REPARTIDOR"></app-repartidor-select>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-grupo-grid-field aocUiFormField="Grupos asociados" [formControlName]="UsuarioClass.collection.GRUPO"></app-grupo-grid-field>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class UsuarioFormComponent implements OnInit {
  protected UsuarioClass = Usuario;

  protected formGroup: FormGroup<AocFormGroupType<Usuario>>;

  protected usuario: Usuario;

  protected contrasenyaPlaceholder = 'Asignar contraseña nueva...';

  passwordType: 'password' | 'text' = 'password';

  protected restOptions: AocRestOptions<Usuario> = {
    fields: ['nombre', 'nombre_completo', 'mail', 'tecnico', 'repartidor'],
    populate: {
      tecnico: true,
      repartidor: true,
      grupoCollection: true
    }
  };

  constructor(
    protected modelConfig: UsuarioModelConfig,
    private aocFormController: AocFormController<Usuario>
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Usuario>>({
      nombre: new FormControl(null, Validators.required),
      nombre_completo: new FormControl(),
      contrasenya: new FormControl(null),
      mail: new FormControl(null, Validators.required),
      tecnico: new FormControl(),
      repartidor: new FormControl(),
      grupoCollection: new FormControl([])
    });
    this.handleFormController().then();
  }

  protected swapPasswordType() {
    this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
  }

  private async handleFormController() {
    this.usuario = await this.aocFormController.model();
    if (this.usuario.id) {
      this.contrasenyaPlaceholder = 'Dejar vacío para mantener la contraseña actual...';
    } else {
      this.formGroup.controls.contrasenya.addValidators(Validators.required);
      this.formGroup.controls.contrasenya.updateValueAndValidity();
    }
  }
}
