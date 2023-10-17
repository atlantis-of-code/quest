import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AddressTemplate } from '../../../../models/templates/address-template';
import { CountryAutocompleteComponent } from '../../common/country/country-autocomplete.component';
import { StreetSuffixAutocompleteComponent } from '../../common/street-suffix/street-suffix-autocomplete.component';

@Component({
    selector: 'app-address-template-subform',
    standalone: true,
  imports: [
    AocFormModule,
    StreetSuffixAutocompleteComponent,
    AocUiFormModule,
    ReactiveFormsModule,
    AocUiInputTextModule,
    CountryAutocompleteComponent
  ],
    template: `
      <aoc-subform>
        <ng-template let-formGroup>
          <ng-container [formGroup]="formGroup">
            <aoc-ui-form-fieldset title="Address">
              <aoc-ui-form-row>
                <input aocUiInputText aocUiFormField="St.Number" [formControlName]="AddressTemplateClass.field.STREET_NAME" [span]="4">
                <input aocUiInputText aocUiFormField="St.Name" [formControlName]="AddressTemplateClass.field.STREET_NAME">
                <app-street-suffix-autocomplete
                  aocUiFormField="St.Suffix"
                  [formControlName]="AddressTemplateClass.entity.STREET_SUFFIX"
                  [span]="4"
                ></app-street-suffix-autocomplete>
              </aoc-ui-form-row>
              <aoc-ui-form-row>
                <input aocUiInputText aocUiFormField="Additional data (e.g., Apartment, Suite, Building)" [formControlName]="AddressTemplateClass.field.ADDITIONAL_DATA" [span]="10">
                <input aocUiInputText aocUiFormField="Floor" [formControlName]="AddressTemplateClass.field.FLOOR">
                <input aocUiInputText aocUiFormField="Door" [formControlName]="AddressTemplateClass.field.DOOR">
                <input aocUiInputText aocUiFormField="Block" [formControlName]="AddressTemplateClass.field.BLOCK">
                <input aocUiInputText aocUiFormField="Area" [formControlName]="AddressTemplateClass.field.AREA">
              </aoc-ui-form-row>
              <aoc-ui-form-row>
                <input aocUiInputText aocUiFormField="City" [formControlName]="AddressTemplateClass.field.CITY">
                <input aocUiInputText aocUiFormField="State" [formControlName]="AddressTemplateClass.field.STATE">
                <input aocUiInputText aocUiFormField="ZIP Code" [formControlName]="AddressTemplateClass.field.ZIP_CODE" [span]="4">
                <app-country-autocomplete aocUiFormField="Country" [formControlName]="AddressTemplateClass.entity.COUNTRY"></app-country-autocomplete>
              </aoc-ui-form-row>
            </aoc-ui-form-fieldset>
          </ng-container>
      </ng-template>
        </aoc-subform>
    `
})
export class AddressTemplateSubformComponent {
    AddressTemplateClass = AddressTemplate;
}
