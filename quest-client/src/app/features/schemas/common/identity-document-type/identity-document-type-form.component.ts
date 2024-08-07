import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { IdentityDocumentTypeModelConfig } from '../../../../model-configs/common/identity-document-type-model-config';
import { IdentityDocumentType } from '../../../../models/common/identity-document-type';

@Component({
  selector: 'app-identity-document-type-form',
  standalone: true,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    AocUiInputCheckboxModule
  ],
  providers: [ AocFormController ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Name" [formControlName]="$.field.NAME">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Is default" [formControlName]="$.field.IS_DEFAULT" [span]="6">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class IdentityDocumentTypeFormComponent implements AocUiWindowDynConfigurable{
  protected $ = IdentityDocumentType;
  protected modelConfig = inject(IdentityDocumentTypeModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<IdentityDocumentType>>({
    name: new FormControl(null, Validators.required),
    is_default: new FormControl(false, Validators.required)
  });

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return{
      width: 480,
      height: 150
    };
  }
}
