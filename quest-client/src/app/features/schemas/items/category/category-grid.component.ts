import { Component, OnInit } from '@angular/core';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { CategoryModelConfig } from '../../../../model-configs/items/category-model-config';
import { Category } from '../../../../models/items/category';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns"></aoc-grid>
  `
})
export default class CategoryGridComponent implements OnInit, AocUiWindowDynConfigurable {
  protected columns: AocGridColumn[];

  constructor(
    protected modelConfig: CategoryModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) {}

  ngOnInit() {
    this.columns = [
      {
        header: 'Name',
        display: Category.field.NAME,
        defaultSort: 'asc'
      }
    ];
    this.aocUiWindowDynRef.show();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      header: 'Categories',
      width: 320,
      height: 649
    };
  }
}
