import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { LegalDataTemplate } from '../../../../models/templates/legal-data-template';
import {
  IdentityDocumentTypeAutocompleteComponent
} from '../../common/identity-document-type/identity-document-type-autocomplete.component';

@Component({
  selector: 'app-legal-data-template-subform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    IdentityDocumentTypeAutocompleteComponent,
    AocFormModule
  ],
  template: `
    <aoc-subform>
      <ng-template let-formGroup>
        <aoc-ui-form-row [formGroup]="formGroup">
          <input aocUiInputText aocUiFormField="Legal name" [formControlName]="LegalDataTemplateClass.field.LEGAL_NAME">
          <input [span]="6" aocUiInputText aocUiFormField="Document number" [formControlName]="LegalDataTemplateClass.field.DOCUMENT_NUMBER">
          <app-identity-document-type-autocomplete
            [span]="6"
            aocUiFormField="Identity document type"
            [formControlName]="LegalDataTemplateClass.entity.IDENTITY_DOCUMENT_TYPE"
          ></app-identity-document-type-autocomplete>
        </aoc-ui-form-row>
      </ng-template>
    </aoc-subform>
  `
})
export class LegalDataTemplateSubformComponent {
  protected LegalDataTemplateClass = LegalDataTemplate;
}
