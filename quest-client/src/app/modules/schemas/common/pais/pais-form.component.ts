import { Component, OnInit } from '@angular/core';
import { PaisModelConfig } from '../../../../model-configs/common/pais-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Pais } from '../../../../models/common/pais';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-pais-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="PaisClass.field.NOMBRE">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class PaisFormComponent implements OnInit {
  PaisClass = Pais;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: PaisModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Pais.field.NOMBRE]: [undefined, Validators.required]
    })
  }
}
