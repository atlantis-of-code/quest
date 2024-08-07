import { Component, inject } from '@angular/core';
import { AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { AocFormWindowService } from '@atlantis-of-code/aoc-client/core/services';
import { AocUiDataMenu } from '@atlantis-of-code/aoc-client/ui/common/types';
import { CompanyModelConfig } from './model-configs/configuration/company-model-config';
import { meta } from './models/meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private aocFormWindowService = inject(AocFormWindowService);
  private companyModelConfig = inject(CompanyModelConfig);
  private aocModelManager = inject(AocModelManager);

  mainMenu: AocUiDataMenu = [
    {
      label: 'Customers',
      icon: 'groups',
      items: [
        {label: 'Customers panel', routerLink: ['customers', 'customer', 'panel']},
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Items',
      icon: 'auto_awesome_mosaic',
      items: [
        { label: 'Items', routerLink: ['items', 'item', 'panel' ]},
        //{ label: 'Gestión de fotos', routerLink: ['articulos', 'articulo', 'foto' ]},
        { label: 'Categories', routerLink: ['items', 'category', 'panel']},
        { type: 'separator' },
        { label: 'Stores', routerLink: ['items', 'store', 'panel'] },
        { type: 'separator' },
        { label: 'Stock counts', routerLink: [ 'items', 'stock-count', 'panel' ]},
        { label: 'Store transfers', routerLink: [ 'items', 'store-transfer', 'panel' ]}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Invoicing',
      icon: 'payments',
      items: [
        {label: 'Budgets', routerLink: ['invoicing', 'budget', 'panel']},
        {label: 'Delivery notes', routerLink: ['invoicing', 'delivery-note', 'panel']},
        {type: 'separator'},
        {label: 'Invoices', routerLink: ['invoicing', 'invoice', 'panel']},
        {type: 'separator'},
        {label: 'Tickets', routerLink: ['invoicing', 'ticket', 'panel']}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'General adjustments',
      icon: 'public',
      items: [
        { label: 'Countries', routerLink: ['common', 'country', 'panel'] },
        { label: 'Genders', routerLink: ['common', 'gender', 'panel'] },
        { label: 'Languages', routerLink: ['common', 'language', 'panel']},
        { type: 'separator' },
        { label: 'Taxes', routerLink: ['common', 'tax', 'panel'] },
        { label: 'Series', routerLink: [ 'common', 'series', 'panel' ]},
        { label: 'Fiscal Years', routerLink: [ 'common', 'fiscal-year', 'panel' ]},
        { type: 'separator' },
        { label: 'Payment systems', routerLink: [ 'common', 'payment-system', 'panel' ]}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Configuration',
      icon: 'settings',
      items: [
        {
          label: 'Company',
          icon: 'corporate_fare',
          command: _ => {
            this.aocFormWindowService.openUsingModelConfig({
              modelConfig: this.companyModelConfig,
              aocFormConfig: {
                modelOrId: '1',
                loadFromDatabase: true,
                persistToDatabase: true
              }
            }).then()
          }
        }
      ]
    }
  ];

  headerMenu: AocUiDataMenu = [
  ];

  constructor() {
    this.aocModelManager.registerMeta(meta);
  }
}
