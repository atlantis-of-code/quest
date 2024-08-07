import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { TaxModelConfig } from '../../../../model-configs/common/tax-model-config';
import { Tax } from '../../../../models/common/tax';

@Component({
  selector: 'app-tax-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `<aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>`
})
export class TaxAutocompleteComponent implements OnInit {
  @Input() protected allow: AocModelConfigAllow;
  protected modelConfig = inject(TaxModelConfig);
  protected restOptions: AocRestOptions<Tax> = { orderBy: { percent: 'asc' }};
  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
  }
}
