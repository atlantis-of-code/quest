import { Component, OnInit } from '@angular/core';
import { DenominacionViaModelConfig } from '../../../../model-configs/common/denominacion-via-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DenominacionVia } from '../../../../models/common/denominacion-via';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-denominacion-via-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre del tipo de vía"
                   [formControlName]="DenominacionViaClass.field.NOMBRE">
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
export default class DenominacionViaFormComponent implements OnInit {
  DenominacionViaClass = DenominacionVia;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: DenominacionViaModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [DenominacionVia.field.NOMBRE]: [null, Validators.required]
    })
  }
}
