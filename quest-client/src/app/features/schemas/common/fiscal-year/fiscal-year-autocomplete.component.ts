import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { FiscalYearModelConfig } from '../../../../model-configs/common/fiscal-year-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';

@Component({
  selector: 'app-fiscal-year-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions"></aoc-autocomplete>
  `
})
export class FiscalYearAutocompleteComponent implements OnInit {
  @Input() protected allow: AocModelConfigAllow;
  protected modelConfig = inject(FiscalYearModelConfig);
  protected restOptions: AocRestOptions<FiscalYear> = {
    orderBy: { year: 'desc' }
  };

  ngOnInit() {
    if(this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
  }
}
