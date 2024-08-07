import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { InvoiceModelConfig } from '../../../../model-configs/invoicing/invoice-model-config';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { Invoice } from '../../../../models/invoicing/invoice';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { PaymentGridComponentField } from '../../accounting/payment/payment-grid-field.component';
import { FileGridFieldComponent } from '../../files/file-grid-field.component';
import {
  DocumentTemplateSubformComponent
} from '../../templates/document-template/document-template-subform.component';
import { DocumentTemplateTotalsComponent } from '../../templates/document-template/document-template-totals.component';
import { DeliveryNoteInvoiceGridFieldComponent } from '../delivery-note/delivery-note-invoice-grid-field.component';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiTabPanelModule,
    DocumentTemplateSubformComponent,
    AocUiFormModule,
    FileGridFieldComponent,
    DeliveryNoteInvoiceGridFieldComponent,
    DocumentTemplateTotalsComponent,
    PaymentGridComponentField,
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Data">
            <aoc-ui-form-page>
              <app-document-template-subform seriesType="Invoice"></app-document-template-subform>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-delivery-note-invoice-grid-field aocUiFormField="Associated delivery notes" [formControlName]="$.collection.DELIVERY_NOTE"></app-delivery-note-invoice-grid-field>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="15rem">
                <app-payment-grid-field aocUiFormField="Payments" [formControlName]="$.collection.PAYMENT"></app-payment-grid-field>
              </aoc-ui-form-row>
              <app-document-template-totals
                [formGroup]="formGroup"
                [linesFormControl]="formGroup.controls.deliveryNoteCollection"
                mode="Document"
              ></app-document-template-totals>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Files">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-file-grid-field
                  aocUiFormField="Associated files to the invoice"
                  [fileParentClass]="$"
                  fileDirectory="Invoices"
                  [formControlName]="$.collection.FILE"
                ></app-file-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `
})
export default class InvoiceFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected $ = Invoice;
  protected modelConfig = inject(InvoiceModelConfig);
  protected formGroup: FormGroup<AocFormGroupType<Invoice>>;
  protected restOptions: AocRestOptions<Invoice> = {
    populate: {
      fiscalYear: true,
      series: true,
      customer: true,
      fileCollection: true,
      deliveryNoteCollection: {
        fiscalYear: true,
        series: true
      },
      paymentCollection: {
        paymentSystem: true
      }
    }
  };

  private questUtilsService = inject(QuestUtilsService);
  private aocFormController = inject(AocFormController<Invoice>);

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Invoice>>({
      deliveryNoteCollection: new FormControl([], (ctrl) => {
        const dns: DeliveryNote[] = ctrl?.value ?? [];
        if (dns.filter(dn => !dn.isMarkedForDeletion()).length) {
          return null;
        }
        return { 'At least one delivery note is needed to save an invoice': true };
      }),
      fileCollection: new FormControl([]),
      paymentCollection: new FormControl([])
    });
    this.questUtilsService.addControlsForDocumentTemplate('Invoice', this.formGroup);
    this.handleFormController().then();
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 1600,
      height: 800
    };
  }

  private async handleFormController() {
    // We want to avoid changing the customer once the invoice is created
    const invoice = await this.aocFormController.patched();
    if (invoice.id) {
      this.formGroup.controls.customer.disable();
    }
  }
}
