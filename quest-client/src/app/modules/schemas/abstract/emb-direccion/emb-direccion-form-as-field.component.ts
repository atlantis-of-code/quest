import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormGroupDirective, FormGroupName, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { EmbDireccion } from '../../../../models/abstract/emb-direccion';
import { Cliente } from '../../../../models/clientes/cliente';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { NgIf } from '@angular/common';
import { DenominacionViaSelectComponent } from '../../common/denominacion-via/denominacion-via-select.component';
import { PaisSelectComponent } from '../../common/pais/pais-select.component';

@Component({
  selector: 'app-emb-direccion-form-as-field',
  standalone: true,
  imports: [
    AocUiFormModule,
    PaisSelectComponent,
    AocUiInputTextModule,
    ReactiveFormsModule,
    DenominacionViaSelectComponent,
    AocUiButtonModule,
    NgIf
  ],
  template: `
    <ng-container [formGroup]="embDireccionFormGroup">
      <aoc-ui-form-row>
        <app-pais-select aocUiFormField="País" [formControlName]="EmbDireccionClass.entity.PAIS"></app-pais-select>
        <input aocUiInputText aocUiFormField="Código postal" [formControlName]="EmbDireccionClass.field.CODIGO_POSTAL">
        <input aocUiInputText aocUiFormField="Provincia" [formControlName]="EmbDireccionClass.field.PROVINCIA">
        <input aocUiInputText aocUiFormField="Municipio" [formControlName]="EmbDireccionClass.field.MUNICIPIO">
        <input aocUiInputText aocUiFormField="Localidad" [formControlName]="EmbDireccionClass.field.LOCALIDAD">
      </aoc-ui-form-row>
      <aoc-ui-form-row>
        <app-denominacion-via-select aocUiFormField="Denom.vía" [span]="5"
                                     [formControlName]="EmbDireccionClass.entity.DENOMINACION_VIA"></app-denominacion-via-select>
        <input aocUiInputText aocUiFormField="Nombre vía" [span]="8"
               [formControlName]="EmbDireccionClass.field.NOMBRE_VIA">
        <input aocUiInputText aocUiFormField="Nº" [formControlName]="EmbDireccionClass.field.NUMERO">
        <input aocUiInputText aocUiFormField="Piso" [formControlName]="EmbDireccionClass.field.PISO">
        <input aocUiInputText aocUiFormField="Puerta" [formControlName]="EmbDireccionClass.field.PUERTA">
        <input aocUiInputText aocUiFormField="Bloque" [formControlName]="EmbDireccionClass.field.BLOQUE">
        <input aocUiInputText aocUiFormField="Portal" [formControlName]="EmbDireccionClass.field.PORTAL">
        <input aocUiInputText aocUiFormField="Esc" [formControlName]="EmbDireccionClass.field.ESCALERA">
      </aoc-ui-form-row>
      <aoc-ui-form-row>
        <input aocUiInputText aocUiFormField="Edificio/Urbanización"
               [formControlName]="EmbDireccionClass.field.EDIFICIO_O_URBANIZACION">
        <input aocUiInputText aocUiFormField="Datos adicionales"
               [formControlName]="EmbDireccionClass.field.DATOS_ADICIONALES">
      </aoc-ui-form-row>
      <aoc-ui-form-row *ngIf="activarCopiaCliente">
        <span aocUiFormRowElement [span]="20"></span>
        <button
          aocUiFormRowElement
          aocUiButton
          icon="person"
          label="Copiar de cliente"
          [disabled]="!cliente"
          (click)="copiarDireccionCliente()"
        ></button>
      </aoc-ui-form-row>
    </ng-container>
  `
})
export class EmbDireccionFormAsFieldComponent implements OnInit {
  @Input() activarCopiaCliente = false;

  @Input() cliente: Cliente;

  EmbDireccionClass = EmbDireccion;

  embDireccionFormGroup: UntypedFormGroup


  constructor(
    @Optional() private formGroupName: FormGroupName,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit() {
    if (this.formGroupName) {
      this.embDireccionFormGroup = this.formGroupName.control;
    } else {
      this.embDireccionFormGroup =this.formGroupDirective.form;
    }
  }

  copiarDireccionCliente() {
    this.embDireccionFormGroup.setValue(this.cliente.embDireccion);
  }
}
