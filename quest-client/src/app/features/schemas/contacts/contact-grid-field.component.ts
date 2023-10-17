import { Component, OnInit } from '@angular/core';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { ContactModelConfig } from '../../../model-configs/contacts/contact-model-config';
import { Contact } from '../../../models/contacts/contact';

@Component({
  selector: 'app-contact-grid-field',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid-field [modelConfig]="modelConfig" [columns]="columns"></aoc-grid-field>
  `
})
export class ContactGridFieldComponent implements OnInit {
  protected columns: AocGridColumn[];

  constructor(
    protected modelConfig: ContactModelConfig
  ) {}

  ngOnInit() {
    this.columns = [
      {
        header: 'Name',
        display: Contact.field.NAME,
        defaultSort: 'desc'
      },
      {
        header: 'Phone 1',
        display: Contact.field.PHONE1,
      },
      {
        header: 'Phone 2',
        display: Contact.field.PHONE2,
      },
      {
        header: 'Email',
        display: Contact.field.EMAIL,
      },
      {
        header: 'Fax',
        display: Contact.field.FAX,
      }
    ];
  }
}
