import { Component, Input, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  FormGroupDirective,
  FormGroupName,
  ReactiveFormsModule,
  UntypedFormGroup
} from '@angular/forms';
import { EmbDatosFiscales } from '../../../../models/abstract/emb-datos-fiscales';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { NgIf } from '@angular/common';
import { TipoDocumentoSelectComponent } from '../../common/tipo-documento/tipo-documento-select.component';

@Component({
  selector: 'app-emb-datos-fiscales-form-as-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    NgIf,
    TipoDocumentoSelectComponent
  ],
  template: `
    <ng-container [formGroup]="formGroup">
      <aoc-ui-form-row>
        <input aocUiInputText aocUiFormField="Nombre/Razón social" [span]="esconderApellidos ? 14 : 6"
               [formControlName]="EmbDatosFiscalesClass.field.NOMBRE_FISCAL">
        <input *ngIf="!esconderApellidos" aocUiInputText aocUiFormField="Apellido 1" [span]="4"
               [formControlName]="EmbDatosFiscalesClass.field.APELLIDO_1">
        <input *ngIf="!esconderApellidos" aocUiInputText aocUiFormField="Apellido 2" [span]="4"
               [formControlName]="EmbDatosFiscalesClass.field.APELLIDO_2">
        <app-tipo-documento-select aocUiFormField="Tipo documento" [span]="4"
                                   [formControlName]="EmbDatosFiscalesClass.entity.TIPO_DOCUMENTO"></app-tipo-documento-select>
        <input aocUiInputText aocUiFormField="Nº documento" [span]="6"
               [formControlName]="EmbDatosFiscalesClass.field.NUMERO_DOCUMENTO">
      </aoc-ui-form-row>
    </ng-container>

  `
})
export class EmbDatosFiscalesFormAsFieldComponent implements OnInit {
  EmbDatosFiscalesClass = EmbDatosFiscales;

  controlsConfig: {[key: string]: AbstractControl};

  @Input()
  formGroup: UntypedFormGroup;

  @Input()
  esconderApellidos = false;

  constructor(
    @Optional() private formGroupName: FormGroupName,
    private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit(): void {
    if (this.formGroupName) {
      this.formGroup = this.formGroupName.control;
    } else {
      this.formGroup = this.formGroupDirective.form;
    }
  }
}
