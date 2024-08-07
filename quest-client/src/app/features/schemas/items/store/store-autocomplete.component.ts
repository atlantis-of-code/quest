import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { StoreModelConfig } from '../../../../model-configs/items/store-model-config';
import { Store } from '../../../../models/items/store';

@Component({
  selector: 'app-store-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [placeholder]="placeholder"></aoc-autocomplete>
  `
})
export class StoreAutocompleteComponent implements OnInit {
  @Input() allow: AocModelConfigAllow;
  @Input() placeholder: string;

  protected modelConfig = inject(StoreModelConfig);
  protected restOptions: AocRestOptions<Store> = {
    orderBy: { name: 'asc' }
  }

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
  }
}
