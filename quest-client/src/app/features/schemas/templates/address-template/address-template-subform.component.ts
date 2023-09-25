import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AddressTemplate } from '../../../../models/templates/address-template';
import { StreetSuffixAutocompleteComponent } from '../../common/street-suffix/street-suffix-autocomplete.component';

@Component({
    selector: 'app-address-template-subform',
    standalone: true,
    imports: [
        AocFormModule,
        StreetSuffixAutocompleteComponent,
        AocUiFormModule,
        ReactiveFormsModule,
        AocUiInputTextModule
    ],
    template: `
        <aoc-subform>
            <ng-template let-formGroup>
                <ng-container [formGroup]="formGroup">
                    <aoc-ui-form-row>
                        <app-street-suffix-autocomplete aocUiFormField="St.Suffix" [formControlName]="AddressTemplateClass.entity.STREET_SUFFIX"></app-street-suffix-autocomplete>
                        <input aocUiInputText aocUiFormField="Street name" [formControlName]="AddressTemplateClass.field.STREET_NAME">
                    </aoc-ui-form-row>
                </ng-container>
            </ng-template>
        </aoc-subform>
    `
})
export class AddressTemplateSubformComponent {
    AddressTemplateClass = AddressTemplate;
}
