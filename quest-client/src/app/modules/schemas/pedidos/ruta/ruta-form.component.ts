import { Component, OnInit } from '@angular/core';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { RutaModelConfig } from '../../../../model-configs/pedidos/ruta-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Ruta } from '../../../../models/pedidos/ruta';
import { CommonModule } from '@angular/common';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-ruta-form',
  template: `
    <aoc-form [modelConfig]="modelConfig" [formGroup]="formGroup">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="RutaClass.field.NOMBRE">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  standalone: true,
  imports: [
    CommonModule,
    AocFormModule,
    AocUiFormModule,
    AocUiInputTextModule,
    ReactiveFormsModule
  ],
  providers: [ AocFormController ],
})
export default class RutaFormComponent implements OnInit {
  RutaClass = Ruta;
  formGroup: UntypedFormGroup
  constructor(
    protected modelConfig: RutaModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      [Ruta.field.NOMBRE]: [null, Validators.required]
    });
  }
}

