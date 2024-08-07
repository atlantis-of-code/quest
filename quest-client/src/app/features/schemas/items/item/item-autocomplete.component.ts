import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { ItemModelConfig } from '../../../../model-configs/items/item-model-config';
import { Item } from '../../../../models/items/item';

@Component({
  selector: 'app-item-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `
    <aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [placeholder]="placeholder"></aoc-autocomplete>
  `
})
export class ItemAutocompleteComponent implements OnInit {
  @Input() allow: AocModelConfigAllow;
  @Input() placeholder: string;
  @Input() loadCategory = false;
  @Input() loadPhoto = false;
  protected modelConfig = inject(ItemModelConfig);
  protected restOptions: AocRestOptions<Item> = {
    orderBy: { code: 'desc' }, populate: {tax: true}
  };

  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
    if (this.loadCategory) {
      this.restOptions.populate.category = true;
    }
    if (this.loadPhoto) {
      this.restOptions.populate.photo = true;
    }
  }
}
