import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { ReplaySubject, takeUntil } from 'rxjs';
import { TicketModelConfig } from '../../../../model-configs/invoicing/ticket-model-config';
import { Address } from '../../../../models/common/address';
import { LegalData } from '../../../../models/common/legal-data';
import { Ticket } from '../../../../models/invoicing/ticket';
import { QuestDefaultsService } from '../../../../services/quest-defaults-service';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { PaymentGridComponentField } from '../../accounting/payment/payment-grid-field.component';
import { FileGridFieldComponent } from '../../files/file-grid-field.component';
import { AddressTemplateSubformComponent } from '../../templates/address-template/address-template-subform.component';
import {
  DocumentLineGridFieldComponent
} from '../../templates/document-line-template/document-line-grid-field.component';
import {
  DocumentTemplateSubformComponent
} from '../../templates/document-template/document-template-subform.component';
import { DocumentTemplateTotalsComponent } from '../../templates/document-template/document-template-totals.component';
import {
  LegalDataTemplateSubformComponent
} from '../../templates/legal-data-template/legal-data-template-subform.component';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  providers: [ AocFormController ],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    DocumentLineGridFieldComponent,
    DocumentTemplateSubformComponent,
    DocumentTemplateTotalsComponent,
    AocUiTabPanelModule,
    LegalDataTemplateSubformComponent,
    AddressTemplateSubformComponent,
    FileGridFieldComponent,
    PaymentGridComponentField
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Data">
            <aoc-ui-form-page>
              <app-document-template-subform seriesType="Ticket"></app-document-template-subform>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-document-line-template-grid-field
                  aocUiFormField="Lines"
                  [formControlName]="$.collection.STOCK_LINE_LINE"
                  [handleStores]="true"
                ></app-document-line-template-grid-field>
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="15rem">
                <app-payment-grid-field aocUiFormField="Payments" [formControlName]="$.collection.PAYMENT"></app-payment-grid-field>
              </aoc-ui-form-row>
              <app-document-template-totals
                [formGroup]="formGroup"
                [linesFormControl]="formGroup.controls.stockLineLineCollection"
              ></app-document-template-totals>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Fiscal data copy">
            <aoc-ui-form-page>
              <aoc-ui-form-fieldset title="Customer fiscal data copy">
                <app-legal-data-template-subform [formGroupName]="$.entity.CUSTOMER_LEGAL_DATA"></app-legal-data-template-subform>
                <app-address-template-subform [formGroupName]="$.entity.CUSTOMER_ADDRESS"></app-address-template-subform>
              </aoc-ui-form-fieldset>
              <aoc-ui-form-fieldset title="Company fiscal data copy">
                <app-legal-data-template-subform [formGroupName]="$.entity.COMPANY_LEGAL_DATA"></app-legal-data-template-subform>
                <app-address-template-subform [formGroupName]="$.entity.COMPANY_ADDRESS"></app-address-template-subform>
              </aoc-ui-form-fieldset>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Files">
            <app-file-grid-field
              [fileParentClass]="$"
              fileDirectory="Tickets"
              [formControlName]="$.collection.FILE"
            ></app-file-grid-field>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `
})
export default class TicketFormComponent implements OnInit, AocUiWindowDynConfigurable {
  $ = Ticket;
  protected modelConfig = inject(TicketModelConfig);
  protected formGroup: FormGroup<AocFormGroupType<Ticket>>;
  protected restOptions: AocRestOptions<Ticket> = {
    populate: {
      customer: true,
      fiscalYear: true,
      series: true,
      customerLegalData: true,
      customerAddress: true,
      companyLegalData: true,
      companyAddress: true,
      stockLineLineCollection: {
        item: {
          category: true,
          photo: true,
          tax: true
        },
        store: true,
        tax: true
      },
      fileCollection: true,
      paymentCollection: {
        paymentSystem: true
      }
    }
  };

  private questUtilsService = inject(QuestUtilsService);
  private questDefaultsService = inject(QuestDefaultsService);
  private aocFormController = inject(AocFormController<Ticket>);

  @AocUnsubscribe
  private unsubscriber = new ReplaySubject<void>()

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 1400,
      height: 800
    };
  }

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Ticket>>({
      customerLegalData: this.questUtilsService.addControlsForLegalDataTemplate(),
      customerAddress: this.questUtilsService.addControlsForAddressTemplate(),
      companyLegalData: this.questUtilsService.addControlsForLegalDataTemplate(),
      companyAddress: this.questUtilsService.addControlsForAddressTemplate(),
      stockLineLineCollection: new FormControl([]),
      fileCollection: new FormControl([]),
      paymentCollection: new FormControl([])
    });
    this.questUtilsService.addControlsForDocumentTemplate('Ticket', this.formGroup);
    this.handleFormController().then();
  }

  private async handleFormController() {
    const ticket = await this.aocFormController.patched();
    this.formGroup.controls.customer.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe(customer => {
      if (customer) {
        this.formGroup.controls.customerLegalData.setValue(customer.legalDataTemplate as LegalData);
        this.formGroup.controls.customerAddress.setValue(customer.addressTemplate as Address);
      }
    });
    if (!ticket.id) {
      this.formGroup.controls.companyLegalData.setValue(this.questDefaultsService.$company.legalDataTemplate as LegalData);
      this.formGroup.controls.companyAddress.setValue(this.questDefaultsService.$company.addressTemplate as Address);
    }
  }

}
