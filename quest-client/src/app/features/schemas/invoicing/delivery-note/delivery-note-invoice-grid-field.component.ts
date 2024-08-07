import { Component, inject, OnInit } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AocFilterQuery } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocModelConfigFormResolver } from '@atlantis-of-code/aoc-client/core/configs';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';
import { AocUiInputGroupModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-group';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { DeliveryNoteModelConfig } from '../../../../model-configs/invoicing/delivery-note-model-config';
import { FiscalYear } from '../../../../models/common/fiscal-year';
import { Customer } from '../../../../models/customers/customer';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { Invoice } from '../../../../models/invoicing/invoice';
import { QuestDatePipe } from '../../../../pipes/quest-date.pipe';
import { QuestDocumentPipe } from '../../../../pipes/quest-document.pipe';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';
import { DeliveryNoteInvoiceAutocompleteComponent } from './delivery-note-invoice-autocomplete.component';

@Component({
  selector: 'app-delivery-note-invoice-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    AocUiButtonModule,
    DeliveryNoteInvoiceAutocompleteComponent,
    ReactiveFormsModule,
    AocUiVerticalSeparatorModule,
    AocUiInputGroupModule,
    AocUiTooltipModule
  ],
  template: `
    <aoc-grid-field [modelConfig]="modelConfig" [columns]="columns" [relationField]="$.entity.INVOICE">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <button aocUiButton [disabled]="!selectedCustomer" label="Add new local delivery note" icon="add" aocUiTooltip="Will be persisted with the invoice" (click)="addLocal()"></button>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          <button aocUiButton [disabled]="!selectedCustomer" label="Add all pending delivery notes" icon="playlist_add" (click)="addAllPendingDeliveryNotes()"></button>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item label="Add delivery one at a time">
          <aoc-ui-input-group>
            <app-delivery-note-invoice-autocomplete
              [customer]="selectedCustomer"
              [deliveryNotes]="ngControl.control?.value ?? []"
              style="width: 25rem"
              [formControl]="deliveryNoteAutocompleteControl"
            ></app-delivery-note-invoice-autocomplete>
            <button aocUiButton [disabled]="!deliveryNoteAutocompleteControl.value" label="Add" icon="add" (click)="addOne()"></button>
          </aoc-ui-input-group>
        </aoc-ui-item>
      </ng-template>
    </aoc-grid-field>
  `
})
export class DeliveryNoteInvoiceGridFieldComponent implements OnInit {
  protected $ = DeliveryNote;
  protected modelConfig = inject(DeliveryNoteModelConfig);
  protected columns: AocGridColumn<DeliveryNote>[];
  protected selectedCustomer: Customer = undefined;
  protected deliveryNoteAutocompleteControl = new FormControl<DeliveryNote>({value: null, disabled: true});
  protected ngControl = inject(NgControl);

  private questDatePipe = inject(QuestDatePipe);
  private questPricePipe = inject(QuestPricePipe);
  private questDocumentPipe = inject(QuestDocumentPipe);
  private aocFormController = inject(AocFormController<Invoice>);
  private aocRestService = inject(AocRestService);
  private aocFormWindowService = inject(AocFormWindowService);
  private aocUiToastMessageService = inject(AocUiToastMessageService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);

  ngOnInit() {
    // whatever situation we are in here, we can edit the delivery note, because we are already in an invoice
    // By using the 'id' we force the form to load with its own populates and do not depend on what is invoice form loading.
    // If id is < 0 it means is still a local model, and as it was already coming from a delivery note form we can
    // send it back as is
    this.modelConfig = this.modelConfig.cloneWith({
      allow: ['edit', 'delete'],
      form: new AocModelConfigFormResolver(async modelOrId => {
        if (modelOrId instanceof DeliveryNote && +modelOrId.id > 0) {
          modelOrId = modelOrId.id;
        }
        return {
          form: {
            loadComponent: () => import('./delivery-note-form.component'),
            aocUiWindowDynConfig: {
              width: 1400,
              height: 800
            }
          },
          modelOrId: modelOrId
        }
      })
    });

    this.columns = [
      {
        header: 'Date',
        display: [ DeliveryNote.field.DATE,  this.questDatePipe ],
        size: '8rem',
        defaultSort: 'desc'
      },
      {
        header: 'Fiscal year',
        display: [ DeliveryNote.entity.FISCAL_YEAR, FiscalYear.field.YEAR ],
        size: '8rem'
      },
      {
        header: 'Serial/Number',
        display: this.questDocumentPipe,
        orderBy: {
          fiscalYear: { year: 'auto' },
          series: { name: 'auto' },
          number: 'auto'
        }
      },
      {
        header: 'Total base',
        display: [ DeliveryNote.field.TOTAL_BASE, this.questPricePipe ],
        size: '12rem',
        align: 'right'
      },
      {
        header: 'Total taxes',
        display: [ DeliveryNote.field.TOTAL_TAXES, this.questPricePipe ],
        size: '12rem',
        align: 'right'
      },
      {
        header: 'Total',
        display: [ DeliveryNote.field.TOTAL, this.questPricePipe ],
        size: '12rem',
        align: 'right',
        ngStyle: { fontWeight: 'bold' }
      }
    ];
    this.handleFormControl().then();
  }

  private async handleFormControl() {
    await this.aocFormController.patched();
    this.selectedCustomer = this.aocFormController.getFormGroup().controls.customer.value;
    if (this.selectedCustomer) {
      this.deliveryNoteAutocompleteControl.enable();
    }
    this.aocFormController.getFormGroup().controls.customer.valueChanges.subscribe(newCustomer => {
      // Will only happen if invoice has no id, we can still change the customer
      if (this.selectedCustomer && newCustomer != this.selectedCustomer) {
        this.ngControl.control.reset()
      }
      this.selectedCustomer = newCustomer;
      if (this.selectedCustomer) {
        this.deliveryNoteAutocompleteControl.enable();
      } else {
        this.deliveryNoteAutocompleteControl.disable();
      }
    });
  }

  protected async addLocal() {
    const response = await this.aocFormWindowService.openUsingModelConfig<DeliveryNote>({
      modelConfig: this.modelConfig,
      aocFormConfig: {
        dynamicFormGroup: {
          [DeliveryNote.entity.CUSTOMER]: {
            value: this.selectedCustomer,
            state: 'disabled'
          }
        },
        loadFromDatabase: false,
        persistToDatabase: false // We want it here, local
      },
      aocUiWindowDynConfig: {
        parentWindowNumber: this.aocUiWindowDynRef.windowNumber
      }
    });
    if (response.type === 'save') {
      const newDeliveryNote = response.model;
      const current: DeliveryNote[] = this.ngControl.control.value;
      current.push(newDeliveryNote);
      this.ngControl.control.setValue(current);
    }
  }

  protected async addAllPendingDeliveryNotes() {
    const current: DeliveryNote[] = this.ngControl.control.value ?? [];
    const where: AocFilterQuery<DeliveryNote> = {
      id: { $nin: current.map(dn => dn.id) },
      invoice: { id: null },
      customer: { id: this.selectedCustomer.id }
    };
    const pendingDeliveryNotes = await this.aocRestService.find(DeliveryNote, where, {
      populate: { series: true, fiscalYear: true }
    });
    if (!pendingDeliveryNotes.length) {
      this.aocUiToastMessageService.showWarning(`There are no more pending delivery notes for ${this.selectedCustomer.toString()}`);
    }
    current.push(...pendingDeliveryNotes);
    this.ngControl.control.setValue(current);
  }

  protected addOne() {
    const deliveryNoteToAdd = this.deliveryNoteAutocompleteControl.value;
    const current: DeliveryNote[] = this.ngControl.control.value;
    if (current.find(dn => dn.id === deliveryNoteToAdd.id)) {
      this.aocUiToastMessageService.showWarning('Delivery note already added');
      return;
    }
    current.push(deliveryNoteToAdd);
    this.ngControl.control.setValue(current);
    this.deliveryNoteAutocompleteControl.reset();
  }
}
