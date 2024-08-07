import { Component, inject, OnInit } from '@angular/core';
import { AocMasterDetailModule } from '@atlantis-of-code/aoc-client/components/aoc-master-detail';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocTabConfigurable, AocTabConfigurableParams } from '@atlantis-of-code/aoc-client/core/types';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { of } from 'rxjs';
import { TicketModelConfig } from '../../../../model-configs/invoicing/ticket-model-config';
import { Ticket } from '../../../../models/invoicing/ticket';
import { TicketGridComponent } from './ticket-grid.component';

@Component({
  selector: 'app-ticket-panel',
  standalone: true,
  imports: [
    AocMasterDetailModule,
    TicketGridComponent
  ],
  template: `
    <aoc-master-detail
      [masterModelConfig]="ticketModelConfig"
      [masterModelEmitter]="ticketModelEmitter"
      [detailWidthPercent]="40"
    >
      <ng-template aocMaster>
        <app-ticket-grid [modelEmitter]="ticketModelEmitter"></app-ticket-grid>
      </ng-template>
      <ng-template aocDetail tabName="Preview">
        <!--
            TODO use currentTicket to preview (or its url)
        -->
      </ng-template>
    </aoc-master-detail>
  `
})
export default class TicketPanelComponent implements OnInit, AocTabConfigurable {
  protected ticketModelConfig = inject(TicketModelConfig);

  @AocUnsubscribe
  protected ticketModelEmitter = new AocModelEmitter<Ticket>();

  protected currentTicket: Ticket;

  ngOnInit() {
    this.ticketModelEmitter.model$.subscribe(ticket => this.currentTicket = ticket);
  }

  createAocTabConfig(params?: AocTabConfigurableParams): AocTabConfig {
    return {
      title: of('Tickets')
    }
  }
}
