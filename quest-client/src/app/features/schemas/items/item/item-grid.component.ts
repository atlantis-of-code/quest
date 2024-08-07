import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import {
  AocGridColumn,
  AocGridGroupConfig,
  aocGridGroupDisplay,
  AocTabConfigurable
} from '@atlantis-of-code/aoc-client/core/types';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { fi } from 'date-fns/locale';
import { of, Subscription } from 'rxjs';
import { ItemModelConfig } from '../../../../model-configs/items/item-model-config';
import { Tax } from '../../../../models/common/tax';
import { Category } from '../../../../models/items/category';
import { Item } from '../../../../models/items/item';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { CategoryAutocompleteComponent } from '../category/category-autocomplete.component';

@Component({
  selector: 'app-item-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiInputCheckboxModule,
    ReactiveFormsModule,
    CategoryAutocompleteComponent,
    AocUiInputTextModule,
    AocUiVerticalSeparatorModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [where]="where" [restOptions]="restOptions" [groupConfig]="groupConfig">
        <ng-template aocUiToolbar="left">
          <aoc-ui-item>
            <input type="checkbox" aocUiInputCheckbox="Group by category" [formControl]="groupConfigControl">
          </aoc-ui-item>
        </ng-template>
        <ng-template aocUiToolbar="right">
          <ng-container [formGroup]="filterFormGroup">
            <aoc-ui-item>
              <app-category-autocomplete formControlName="byCategory" allow="none" placeholder="Filter by category..."></app-category-autocomplete>
            </aoc-ui-item>
            <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
            <aoc-ui-item label="Filter by price range">
              <input aocUiInputText formControlName="byStartingPrice" placeholder="from...">
            </aoc-ui-item>
            <aoc-ui-item>
              <input aocUiInputText formControlName="byEndingPrice" placeholder="to...">
            </aoc-ui-item>
            <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
          </ng-container>
        </ng-template>
    </aoc-grid>
  `
})
export default class ItemGridComponent implements OnInit, AocTabConfigurable {
  protected columns: AocGridColumn[];
  protected modelConfig = inject(ItemModelConfig);
  protected where: AocFilterQuery<Item>;
  protected restOptions: AocRestOptions<Item> = {
    populate: {
      tax: true,
      category: true
    }
  };
  // Grid group
  protected groupConfig: AocGridGroupConfig<Category>;
  protected groupConfigControl = new FormControl<boolean>(false, Validators.required);
  @AocUnsubscribe
  private groupSubscription: Subscription;
  // Filters
  protected filterFormGroup = new FormGroup({
    byCategory: new FormControl<Category>(null),
    byStartingPrice: new FormControl<string>(null, AocUiValidators.positiveNumber(2)),
    byEndingPrice: new FormControl<string>(null, AocUiValidators.positiveNumber(2)),
  })
  @AocUnsubscribe
  private filterSubscription: Subscription;

  private questPricePipe = inject(QuestPricePipe);
  private questUtilsService = inject(QuestUtilsService);

  createAocTabConfig(): AocTabConfig {
    return {
      title: of('Items'),
      icon: 'auto_awesome_mosaic'
    };
  }

  ngOnInit() {
    this.columns = [
      {
        header: 'Code',
        display: Item.field.CODE,
        defaultSort: 'desc'
      },
      {
        header: 'Name',
        display: Item.field.NAME
      },
      {
        header: 'Category',
        display: [ Item.entity.CATEGORY, Category.field.NAME  ]
      },
      {
        header: 'Base price',
        display: [ Item.field.BASE_PRICE, this.questPricePipe ],
        align: 'right',
        size: '12rem'
      },
      {
        header: 'Tax',
        display: [ Item.entity.TAX, (tax: Tax) => tax.toString() ],
        align: 'right',
        size: '12rem'
      },
      {
        header: 'Total',
        display: item => this.questUtilsService.getTotalPriceFromItemFormatted(item),
        align: 'right',
        size: '12rem'
      }
    ];

    // Grouping
    this.groupSubscription = this.groupConfigControl.valueChanges.subscribe(enableGrouping => {
      if (enableGrouping) {
        this.groupConfig = {
          trackBy: category => category?.id,
          display: [Item.entity.CATEGORY, aocGridGroupDisplay(category => category?.name ?? 'Items with no group')],
          compareFn: (cat1, cat2) => cat1?.name?.localeCompare(cat2?.name)
        }
      } else {
        this.groupConfig = undefined;
      }
    });
    // Filters
    this.filterSubscription = this.filterFormGroup.valueChanges.subscribe(filters => {
      if (!this.filterFormGroup.valid) {
        return;
      }
      this.where = { $and: [] };
      if (filters.byCategory) {
        this.where.$and.push({ category: { id: filters.byCategory.id }});
      }
      if (filters.byStartingPrice) {
        this.where.$and.push({ base_price: { $gte: filters.byStartingPrice }});
      }
      if (filters.byEndingPrice) {
        this.where.$and.push({ base_price: { $lte: filters.byEndingPrice }});
      }
    });
  }

  protected readonly fi = fi;
}
