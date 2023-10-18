import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { Customer } from '../../../../models/customers/customer';
import { QuestDefaultsService } from '../../../../services/quest-defaults-service';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { GenderAutocompleteComponent } from '../../common/gender/gender-autocomplete.component';
import { LanguageAutocompleteComponent } from '../../common/language/language-autocomplete.component';
import { ContactGridFieldComponent } from '../../contacts/contact-grid-field.component';
import { FileGridFieldComponent } from '../../files/file-grid-field.component';
import { AddressTemplateSubformComponent } from '../../templates/address-template/address-template-subform.component';
import { ContactTemplateSubformComponent } from '../../templates/contact-template/contact-template-subform.component';
import {
  LegalDataTemplateSubformComponent
} from '../../templates/legal-data-template/legal-data-template-subform.component';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  providers: [ AocFormController ],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    AocUiDatetimePickerModule,
    GenderAutocompleteComponent,
    LanguageAutocompleteComponent,
    LegalDataTemplateSubformComponent,
    AddressTemplateSubformComponent,
    AocUiTabPanelModule,
    ContactTemplateSubformComponent,
    ContactGridFieldComponent,
    FileGridFieldComponent
  ],
  template: `
    <aoc-form [modelConfig]="modelConfig" [formGroup]="formGroup" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Data">
            <aoc-ui-form-page>
              <aoc-ui-form-row>
                <input aocUiInputText aocUiFormField="Code" [formControlName]="CustomerClass.field.CODE" placeholder="Autogenerated on server if empty...">
                <app-language-autocomplete aocUiFormField="Language" [formControlName]="CustomerClass.entity.LANGUAGE"></app-language-autocomplete>
                <app-gender-autocomplete aocUiFormField="Gender" [formControlName]="CustomerClass.entity.GENDER"></app-gender-autocomplete>
              </aoc-ui-form-row>
              <app-legal-data-template-subform [formGroupName]="CustomerClass.embedded.LEGAL_DATA_TEMPLATE"></app-legal-data-template-subform>
              <aoc-ui-form-row>
                <input aocUiInputText aocUiFormField="Trade name" [span]="18" [formControlName]="CustomerClass.field.TRADE_NAME" placeholder="Just for companies, not mandatory...">
                <aoc-ui-datetime-picker aocUiFormField="Birthdate" [formControlName]="CustomerClass.field.BIRTHDATE" mode="date" placeholder="mm/dd/y"></aoc-ui-datetime-picker>
              </aoc-ui-form-row>
              <app-address-template-subform [formGroupName]="CustomerClass.embedded.ADDRESS_TEMPLATE"></app-address-template-subform>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Contact">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Main Contact Info">
                <app-contact-template-subform></app-contact-template-subform>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-contact-grid-field aocUiFormField="Additional Contacts" [formControlName]="CustomerClass.collection.CONTACT"></app-contact-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Files">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-file-grid-field
                  aocUiFormField="Customer files (documents, contracts...)"
                  [formControlName]="CustomerClass.collection.FILE"
                  [fileParentClass]="CustomerClass"
                  fileDirectory="Customers"
                ></app-file-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `
})
export default class CustomerFormComponent implements OnInit {
  protected CustomerClass = Customer;

  protected formGroup: FormGroup<AocFormGroupType<Customer>>;

  protected restOptions: AocRestOptions<Customer>;

  constructor(
    protected modelConfig: CustomerModelConfig,
    private questDefaultsService: QuestDefaultsService,
    private questUtilsService: QuestUtilsService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Customer>>({
      code: new FormControl(null),
      trade_name: new FormControl(null),
      birthdate: new FormControl(null),
      gender: new FormControl(this.questDefaultsService.gender),
      language: new FormControl(this.questDefaultsService.language, Validators.required),
      legalDataTemplate: this.questUtilsService.addControlsForLegalDataTemplate(new FormGroup({})), // Embedded
      addressTemplate: this.questUtilsService.addControlsForAddressTemplate(new FormGroup({})), // Embedded
      contactCollection: new FormControl([]),
      fileCollection: new FormControl([])
    });

    // Inline
    this.questUtilsService.addControlsForContactTemplate(this.formGroup);

    this.restOptions = {
      populate: {
        language: true,
        gender: true,
        contactCollection: true,
        fileCollection: true
      }
    }
  }
}
