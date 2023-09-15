import { Component, OnInit } from '@angular/core';
import { VisitaModelConfig } from '../../../../model-configs/contratos/visita-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Visita } from '../../../../models/contratos/visita';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';

@Component({
  selector: 'app-visita-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <aoc-ui-datetime-picker aocUiFormField="Fecha" [span]="5"
                                    [formControlName]="VisitaClass.field.FECHA"></aoc-ui-datetime-picker>
            <input aocUiInputText aocUiFormField="Descripción" [formControlName]="VisitaClass.field.DESCRIPCION">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    AocUiDatetimePickerModule
  ],
  providers: [AocFormController]
})
export default class VisitaFormComponent implements OnInit {
  VisitaClass = Visita;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Visita> = {
    populate: {
      contrato: true
    }
  };

  constructor(
    public modelConfig: VisitaModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Visita.field.FECHA]: [new Date(), Validators.required],
      [Visita.field.DESCRIPCION]: [null, Validators.required],
      [Visita.entity.CONTRATO]: [null, Validators.required]
    });
  }
}
