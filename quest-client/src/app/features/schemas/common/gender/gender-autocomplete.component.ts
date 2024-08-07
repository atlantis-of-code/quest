import { Component, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { GenderModelConfig } from '../../../../model-configs/common/gender-model-config';
import { Gender } from '../../../../models/common/gender';

@Component({
  selector: 'app-gender-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [placeholder]="placeholder"></aoc-autocomplete>
  `
})
export class GenderAutocompleteComponent implements OnInit {
  @Input() placeholder: string;

  @Input() allow: AocModelConfigAllow;

  protected restOptions: AocRestOptions<Gender> = {
    orderBy: {
      name: 'asc'
    }
  };

  constructor(protected modelConfig: GenderModelConfig) {}

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
  }
}
