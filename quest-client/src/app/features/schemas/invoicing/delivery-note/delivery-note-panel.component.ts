import { Component, inject, OnInit } from '@angular/core';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocTabConfigurable, AocTabConfigurableParams } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { of } from 'rxjs';
import { DeliveryNoteModelConfig } from '../../../../model-configs/invoicing/delivery-note-model-config';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { DeliveryNoteGridComponent } from './delivery-note-grid.component';

@Component({
  selector: 'app-delivery-note-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    DeliveryNoteGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelEmitter]="deliveryNoteModelEmitter"
      [masterModelConfig]="deliveryNoteModelConfig"
      [detailWidthPercent]="40"
    >
      <ng-template aocMaster>
        <app-delivery-note-grid [modelEmitter]="deliveryNoteModelEmitter"></app-delivery-note-grid>
      </ng-template>
      <ng-template aocDetail tabName="Preview">
        <!--
        TODO: use current delivery note to see pdf preview (or its url)
        -->
      </ng-template>
    </aoc-master-detail>
  `
})
export default class DeliveryNotePanelComponent implements OnInit, AocTabConfigurable {
  protected deliveryNoteModelConfig = inject(DeliveryNoteModelConfig);

  protected deliveryNoteModelEmitter = new AocModelEmitter<DeliveryNote>();

  // TODO: use current delivery note to send to pdf preview?
  protected currentDeliveryNote: DeliveryNote;

  ngOnInit() {
    this.deliveryNoteModelEmitter.model$.subscribe(deliveryNote => this.currentDeliveryNote = deliveryNote);
  }

  createAocTabConfig(params?: AocTabConfigurableParams): AocTabConfig {
    return {
      title: of('Delivery notes')
    }
  }
}
