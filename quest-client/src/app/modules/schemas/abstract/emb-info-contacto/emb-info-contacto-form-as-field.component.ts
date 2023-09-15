import { Component, OnInit, Optional } from '@angular/core';
import { FormGroupDirective, FormGroupName, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { EmbInfoContacto } from '../../../../models/abstract/emb-info-contacto';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-emb-info-contacto-form-as-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule
  ],
  template: `
    <ng-container [formGroup]="formGroup">
      <aoc-ui-form-row>
        <input aocUiInputText aocUiFormField="Teléfono 1" [formControlName]="EmbInfoContactoClass.field.TELEFONO1">
        <input aocUiInputText aocUiFormField="Teléfono 2" [formControlName]="EmbInfoContactoClass.field.TELEFONO2">
        <input aocUiInputText aocUiFormField="Teléfono 3" [formControlName]="EmbInfoContactoClass.field.TELEFONO3">
        <input aocUiInputText aocUiFormField="Correo electrónico" [formControlName]="EmbInfoContactoClass.field.EMAIL">
      </aoc-ui-form-row>
    </ng-container>
  `
})
export class EmbInfoContactoFormAsFieldComponent implements OnInit {
  formGroup: UntypedFormGroup;

  EmbInfoContactoClass = EmbInfoContacto;

  constructor(
    @Optional() private formGroupName: FormGroupName,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    if (this.formGroupName) {
      this.formGroup = this.formGroupName.control;
    } else {
      this.formGroup = this.formGroupDirective.form;
    }
  }
}
