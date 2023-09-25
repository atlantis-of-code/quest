import {Component, OnInit} from '@angular/core';
import {CustomerModelConfig} from '../../../../model-configs/customers/customer-model-config';
import {AocGridColumn} from '@atlantis-of-code/aoc-client/core/types';
import {Customer} from '../../../../models/customers/customer';
import {LegalDataTemplate} from '../../../../models/templates/legal-data-template';
import {AocGridModule} from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-customer-grid',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns"></aoc-grid>
  `
})
export default class CustomerGridComponent implements OnInit {
  protected columns: AocGridColumn<Customer>[];
  constructor(
    protected modelConfig: CustomerModelConfig
  ) {}

  ngOnInit() {
    this.columns = [
      {
        header: 'Legal name',
        display: [ Customer.embedded.LEGAL_DATA_TEMPLATE, LegalDataTemplate.field.LEGAL_NAME ]
      }
    ];
  }
}
