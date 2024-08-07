import { Component, inject, Input, OnInit } from '@angular/core';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { AocModelConfigAllow } from '@atlantis-of-code/aoc-client/core/configs';
import { CategoryModelConfig } from '../../../../model-configs/items/category-model-config';
import { Category } from '../../../../models/items/category';

@Component({
  selector: 'app-category-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `<aoc-autocomplete [modelConfig]="modelConfig" [restOptions]="restOptions" [placeholder]="placeholder"></aoc-autocomplete>`
})
export class CategoryAutocompleteComponent implements OnInit {
  @Input() allow: AocModelConfigAllow;
  @Input() placeholder: string;
  protected modelConfig = inject(CategoryModelConfig);
  protected restOptions: AocRestOptions<Category> = { orderBy: { name: 'asc' }}
  ngOnInit() {
    if (this.allow) {
      this.modelConfig = this.modelConfig.cloneWithAllow(this.allow);
    }
  }
}
