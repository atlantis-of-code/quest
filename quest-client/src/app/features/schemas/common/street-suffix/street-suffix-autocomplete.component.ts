import { Component } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { StreetSuffixModelConfig } from '../../../../model-configs/common/street-suffix-model-config';
import { StreetSuffix } from '../../../../models/common/street-suffix';

@Component({
    selector: 'app-street-suffix-autocomplete',
    standalone: true,
    imports: [
        AocAutocompleteModule
    ],
    template: `
        <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
    `
})
export class StreetSuffixAutocompleteComponent {
    protected restOptions: AocRestOptions<StreetSuffix> = {
        orderBy: {
            name: 'asc'
        }
    };

    constructor(
        protected modelConfig: StreetSuffixModelConfig
    ) {}
}
