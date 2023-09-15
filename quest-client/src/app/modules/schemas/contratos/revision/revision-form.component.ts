import { Component, OnInit } from '@angular/core';
import { RevisionModelConfig } from '../../../../model-configs/contratos/revision-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Revision } from '../../../../models/contratos/revision';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-revision-form',
  standalone: true,
  template: `
    <aoc-form [modelConfig]="modelConfig" [formGroup]="formGroup">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <aoc-ui-datetime-picker aocUiFormField="Fecha" [span]="6"
                                    [formControlName]="RevisionClass.field.FECHA"></aoc-ui-datetime-picker>
            <input aocUiInputText aocUiFormField="Tipo" [span]="6" [formControlName]="RevisionClass.field.TIPO">
            <input aocUiInputText aocUiFormField="Número" aocUiValueAsNumber
                   [formControlName]="RevisionClass.field.NUMERO">
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Resultado" [formControlName]="RevisionClass.field.RESULTADO">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiDatetimePickerModule,
    ReactiveFormsModule,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class RevisionFormComponent implements OnInit {
  RevisionClass = Revision;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: RevisionModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Revision.field.FECHA]: [null, Validators.required],
      [Revision.field.NUMERO]: [null, [Validators.required, AocUiValidators.positiveNumber(0)]],
      [Revision.field.TIPO]: [null],
      [Revision.field.RESULTADO]: [null]
    });
  }
}
