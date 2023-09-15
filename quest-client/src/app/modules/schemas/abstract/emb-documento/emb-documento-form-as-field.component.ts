import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { EmbDocumento } from '../../../../models/abstract/emb-documento';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { NgIf } from '@angular/common';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { ClienteSelectComponent } from '../../clientes/cliente/cliente-select.component';
import { AnyoFiscalSelectComponent } from '../../common/anyo-fiscal/anyo-fiscal-select.component';

@Component({
  selector: 'app-emb-documento-form-as-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AocUiFormModule,
    AnyoFiscalSelectComponent,
    ClienteSelectComponent,
    AocUiDatetimePickerModule,
    NgIf,
    AocUiInputTextModule
  ],
  template: `
    <ng-container [formGroup]="formGroup">
      <aoc-ui-form-row>
        <div *ngIf="docLabel" aocUiFormRowElement="" style="font-weight: bold; display: flex; align-items: center"
             [span]="2">{{docLabel}}</div>
        <app-anyo-fiscal-select aocUiFormField="Año fiscal" [span]="3"
                                [formControlName]="EmbDocumentoClass.entity.ANYO_FISCAL"></app-anyo-fiscal-select>
        <aoc-ui-datetime-picker aocUiFormField="Fecha" [span]="4" [formControlName]="EmbDocumentoClass.field.FECHA"
                                placeholder="Automàtica..."></aoc-ui-datetime-picker>
        <input aocUiFormField="Serie" [span]="2" aocUiInputText [formControlName]="EmbDocumentoClass.field.SERIE">
        <input aocUiFormField="Número" [span]="2" aocUiInputText aocUiValueAsNumber
               [formControlName]="EmbDocumentoClass.field.NUMERO" placeholder="Automàtico...">
        <app-cliente-select aocUiFormField="Cliente"
                            [formControlName]="EmbDocumentoClass.entity.CLIENTE"></app-cliente-select>
        <input aocUiFormField="IVA" aocUiInputText [span]="2" [formControlName]="EmbDocumentoClass.field.IVA">
      </aoc-ui-form-row>
    </ng-container>

  `
})
export class EmbDocumentoFormAsFieldComponent implements OnInit {
  formGroup: UntypedFormGroup;

  @Input()
  docLabel: string;

  EmbDocumentoClass = EmbDocumento;

  constructor(
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit() {
    this.formGroup = this.formGroupDirective.form;
  }
}
