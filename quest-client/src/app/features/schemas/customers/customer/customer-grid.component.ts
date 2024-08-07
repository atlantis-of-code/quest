import { JsonPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocDirectivesModule } from "@atlantis-of-code/aoc-client/core/directives";
import { AocGridColumn, AocSpreadsheetColumn, } from "@atlantis-of-code/aoc-client/core/types";
import { AocModelEmitter } from "@atlantis-of-code/aoc-client/core/utils";
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiTableModule } from '@atlantis-of-code/aoc-client/ui/data/aoc-ui-table';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { getDate, getMonth } from 'date-fns';
import { CustomerModelConfig } from '../../../../model-configs/customers/customer-model-config';
import { Gender } from '../../../../models/common/gender';
import { Customer } from '../../../../models/customers/customer';
import { LegalDataTemplate } from '../../../../models/templates/legal-data-template';
import { GenderAutocompleteComponent } from '../../common/gender/gender-autocomplete.component';

@Component({
  selector: 'app-customer-grid',
  standalone: true,
  imports: [
    AocGridModule,
    NgIf,
    AocUiTooltipModule,
    AocUiTableModule,
    JsonPipe,
    AocUiToolbarModule,
    AocUiItemModule,
    GenderAutocompleteComponent,
    ReactiveFormsModule,
    AocUiInputCheckboxModule,
    AocUiButtonModule,
    AocDirectivesModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [where]="where" [restOptions]="restOptions" [modelEmitter]="emitter">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button aocUiButton icon="table" aocUiTooltip="Download as XLSX" aocSpreadsheet [modelConfig]="modelConfig" [columns]="spreadSheetColumns" [where]="where" [restOptions]="restOptions" fileName="Customers.xlsx"></button>
        </aoc-ui-item>
      </ng-template>
      <!-- Add some filters to the right of the toolbar -->
      <ng-template aocUiToolbar="right">
        <ng-container [formGroup]="filterFormGroup">
          <aoc-ui-item>
            <input type="checkbox" aocUiInputCheckbox="Today's birthdate" formControlName="byBirthday">
          </aoc-ui-item>
          <aoc-ui-item>
            <app-gender-autocomplete allow="none" formControlName="byGender" placeholder="Filter by gender..."></app-gender-autocomplete>
          </aoc-ui-item>
        </ng-container>
      </ng-template>
      <!-- Draw cake icon if it's the customer birthday -->
      <ng-template aocGridCell="birthday" let-isBirthday="value">
        <span *ngIf="isBirthday" class="material-symbols-rounded" aocUiTooltip="Todays is his/her day...">cake</span>
      </ng-template>
      <!-- Email template to be able to send a mail via mailto -->
      <ng-template aocGridCell="email" let-email="value">
        <a *ngIf="email" href="mailto: {{email}}" target="_blank">{{email}}</a>
      </ng-template>
      <!-- Expander to show the full address -->
      <ng-template aocUiTableTemplate="rowExpansion" let-rowData>
        <p>{{rowData.addressTemplate.street_number ?? 'No number'}} {{rowData.addressTemplate.street_name}} {{rowData.addressTemplate.streetSuffix.name}}</p>
        <p>
          Additional data: {{rowData.addressTemplate.additional_data ?? 'None'}} |
          Floor: {{rowData.addressTemplate.floor ?? 'None'}} |
          Door: {{rowData.addressTemplate.door ?? 'None'}} |
          Block: {{rowData.addressTemplate.block ?? 'None'}} |
          Area: {{rowData.addressTemplate.area ?? 'None'}}
        </p>
        <p>{{rowData.addressTemplate.city}} - {{rowData.addressTemplate.state}} - {{rowData.addressTemplate.zip_code}} - {{rowData.addressTemplate.country.name}}</p>
      </ng-template>
    </aoc-grid>
  `
})
export default class CustomerGridComponent implements OnInit {
  @Input() emitter: AocModelEmitter<Customer>;

  protected columns: AocGridColumn<Customer>[];
  protected spreadSheetColumns: AocSpreadsheetColumn[];

  protected where: AocFilterQuery<Customer>;
  protected filterFormGroup = new FormGroup({
    byGender: new FormControl<Gender | undefined>(null),
    byBirthday: new FormControl(false, Validators.required)
  });
  @AocUnsubscribe
  private filterSubscription;

  protected restOptions: AocRestOptions<Customer> = {};

  constructor(
    protected modelConfig: CustomerModelConfig
  ) {}

  ngOnInit() {
    const today = new Date();
    this.columns = [
      {
        header: '',
        display: [
          Customer.field.BIRTHDATE,
          (birthdate: Date) => getDate(birthdate) === getDate(today) && getMonth(birthdate) === getMonth(today),
          aocUiTplRef('birthday')
        ],
        size: '3rem',
        align: 'center',
        sortable: false
      },
      {
        header: 'Code',
        display: Customer.field.CODE,
        defaultSort: 'asc',
        size: '6rem',
        align: 'right'
      },
      {
        header: 'Legal name',
        display: [ Customer.embedded.LEGAL_DATA_TEMPLATE, (ldt: LegalDataTemplate) => `${ldt.legal_name} (${ldt.document_number})` ],
        orderBy: {
          legalDataTemplate: { legal_name: 'auto' }
        }
      },
      {
        header: 'Trade name',
        display: Customer.field.TRADE_NAME
      },
      {
        header: 'Phones',
        display: customer => [customer.phone1, customer.phone2].filter(p => p?.trim()).join(' - '),
        size: '16rem',
        orderBy: {
          phone1: 'auto',
          phone2: 'auto'
        }
      },
      {
        header: 'Email',
        display: [ Customer.field.EMAIL, aocUiTplRef('email') ],
        size: '16rem',
        orderBy: { email: 'auto' }
      }
    ];

    this.spreadSheetColumns = [
      {
        header: 'Code',
        type: 'string',
        field: Customer.field.CODE
      },
      {
        header: 'Legal name',
        type: 'string',
        field: [ Customer.embedded.LEGAL_DATA_TEMPLATE, LegalDataTemplate.field.LEGAL_NAME ],
        style: {
          font: {
            bold: true
          }
        }
      },
      {
        header: 'Telephone numbers',
        type: 'string',
        field: null,
        transform: 'listTelephoneNumbers'
      },
      {
        header: 'Email',
        type: 'string',
        field: Customer.field.EMAIL
      }
    ];

    this.filterSubscription = this.filterFormGroup.valueChanges.subscribe(filters => {
      this.where = {$and: []};
      if (filters.byGender) {
        this.where.$and.push({ gender: filters.byGender });
      }
      if (filters.byBirthday) {
        this.where.$and.push({ birthdate: { $dateExtract: { part: 'month', from: today }}});
        this.where.$and.push({ birthdate: { $dateExtract: { part: 'day', from: today }}});
      }
    });
  }
}
