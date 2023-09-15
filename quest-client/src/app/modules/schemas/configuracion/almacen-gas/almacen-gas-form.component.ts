import { Component, OnInit } from '@angular/core';
import { AlmacenGasModelConfig } from '../../../../model-configs/configuracion/almacen-gas-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AlmacenGas } from '../../../../models/configuracion/almacen-gas';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-almacen-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Código" [span]="8" [formControlName]="AlmacenClass.field.CODIGO">
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="AlmacenClass.field.NOMBRE">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiInputTextModule,
    ReactiveFormsModule
  ],
  providers: [AocFormController]
})
export default class AlmacenGasFormComponent implements OnInit {
  AlmacenClass = AlmacenGas;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: AlmacenGasModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [AlmacenGas.field.CODIGO]: [null, Validators.required],
      [AlmacenGas.field.NOMBRE]: [null, Validators.required]
    });
  }
}
