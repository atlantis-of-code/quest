import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { ContactTemplate } from '../../../../models/templates/contact-template';

@Component({
  selector: 'app-contact-template-subform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AocUiInputTextModule,
    AocUiFormModule,
    AocFormModule
  ],
  template: `
    <aoc-subform>
      <ng-template let-formGroup>
        <ng-container [formGroup]="formGroup">
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Phone 1" [formControlName]="ContactTemplateClass.field.PHONE1">
            <input aocUiInputText aocUiFormField="Phone 2" [formControlName]="ContactTemplateClass.field.PHONE2">
            <input aocUiInputText aocUiFormField="Email" [formControlName]="ContactTemplateClass.field.EMAIL">
            <input aocUiInputText aocUiFormField="Fax" [formControlName]="ContactTemplateClass.field.FAX">
          </aoc-ui-form-row>
        </ng-container>
      </ng-template>
    </aoc-subform>
  `
})
export class ContactTemplateSubformComponent {
  ContactTemplateClass = ContactTemplate;
}
