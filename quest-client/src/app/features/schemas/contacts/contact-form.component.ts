import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { ContactModelConfig } from '../../../model-configs/contacts/contact-model-config';
import { Contact } from '../../../models/contacts/contact';
import { QuestUtilsService } from '../../../services/quest-utils.service';
import { ContactTemplateSubformComponent } from '../templates/contact-template/contact-template-subform.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    ContactTemplateSubformComponent
  ],
  providers: [ AocFormController ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Name" [formControlName]="ContactClass.field.NAME">
          </aoc-ui-form-row>
          <app-contact-template-subform></app-contact-template-subform>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class ContactFormComponent implements OnInit {
  protected ContactClass = Contact;

  protected formGroup: FormGroup<AocFormGroupType<Contact>>;

  constructor(
    protected modelConfig: ContactModelConfig,
    private questUtilsService: QuestUtilsService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Contact>>({
      name: new FormControl(null, Validators.required)
    });
    // Inline
    this.questUtilsService.addControlsForContactTemplate(this.formGroup);
  }
}
