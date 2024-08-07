import { Component, inject, Input, OnInit } from '@angular/core';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { SeriesModelConfig } from '../../../../model-configs/common/series-model-config';
import { Series, SeriesType } from '../../../../models/common/series';

@Component({
  selector: 'app-series-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [where]="where"></aoc-autocomplete>
  `
})
export class SeriesAutocomplete implements OnInit {
  @Input() protected type: SeriesType;
  @Input() allow: AocModelConfigAllow;
  protected modelConfig = inject(SeriesModelConfig);
  protected restOptions: AocRestOptions<Series> = {
    orderBy: { name: 'asc' }
  };
  protected where: AocFilterQuery<Series>;

  ngOnInit() {
    if (this.type) {
      this.where = { type: this.type };
    }
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
  }
}
