import { Component, inject, Input } from '@angular/core';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocAutocompleteModule } from '@atlantis-of-code/aoc-client/components/aoc-autocomplete';
import { DeliveryNoteModelConfig } from '../../../../model-configs/invoicing/delivery-note-model-config';
import { Customer } from '../../../../models/customers/customer';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';

@Component({
  selector: 'app-delivery-note-invoice-autocomplete',
  standalone: true,
  imports: [
    AocAutocompleteModule
  ],
  template: `<aoc-autocomplete [modelConfig]="modelConfig" [where]="where" [restOptions]="restOptions"></aoc-autocomplete>`
})
export class DeliveryNoteInvoiceAutocompleteComponent {
  @Input() set customer (c: Customer) {
    this.$customer = c;
    this.recalculateWhere();
  };
  @Input() set deliveryNotes(dns: DeliveryNote[]) {
    this.$deliveryNotes = dns;
    this.recalculateWhere();
  }
  protected modelConfig = inject(DeliveryNoteModelConfig).cloneWithAllow('none');
  protected where: AocFilterQuery<DeliveryNote> = { id: '0' };
  protected restOptions: AocRestOptions<DeliveryNote> = {
    populate: {
      series: true,
      fiscalYear: true
    },
    orderBy: {
      date: 'asc'
    }
  };

  $customer: Customer;
  $deliveryNotes: DeliveryNote[];

  private recalculateWhere() {
    if (!this.$customer) {
      this.where = { id: null };
      return;
    }
    this.where = {
      id: { $nin: (this.$deliveryNotes ?? []).map(dn => dn.id) },
      customer: { id: this.$customer.id },
      invoice: { id: null }
    };
  }
}
