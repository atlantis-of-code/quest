import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiLoggerModule } from '@atlantis-of-code/aoc-client/ui/common/directives/aoc-ui-logger';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { DeliveryNoteModelConfig } from '../../../../model-configs/invoicing/delivery-note-model-config';
import { DeliveryNote } from '../../../../models/invoicing/delivery-note';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { FileGridFieldComponent } from '../../files/file-grid-field.component';
import {
  DocumentLineGridFieldComponent
} from '../../templates/document-line-template/document-line-grid-field.component';
import {
  DocumentTemplateSubformComponent
} from '../../templates/document-template/document-template-subform.component';
import { DocumentTemplateTotalsComponent } from '../../templates/document-template/document-template-totals.component';

@Component({
  selector: 'app-delivery-note-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    DocumentTemplateSubformComponent,
    DocumentLineGridFieldComponent,
    DocumentTemplateTotalsComponent,
    AsyncPipe,
    AocUiTabPanelModule,
    FileGridFieldComponent,
    AocUiLoggerModule
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [restOptions]="restOptions" aocUiLogger="INFO">
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Data">
            <aoc-ui-form-page>
              <app-document-template-subform seriesType="Delivery note"></app-document-template-subform>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-document-line-template-grid-field
                  aocUiFormField="Lines"
                  [formControlName]="$.collection.STOCK_LINE_LINE"
                  [handleStores]="true"
                ></app-document-line-template-grid-field>
              </aoc-ui-form-row>
              <app-document-template-totals
                [formGroup]="formGroup"
                [linesFormControl]="formGroup.controls.stockLineLineCollection"
              ></app-document-template-totals>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Files">
            <app-file-grid-field
                [fileParentClass]="$"
                fileDirectory="Delivery Notes"
                [formControlName]="$.collection.FILE"
            ></app-file-grid-field>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `
})
export default class DeliveryNoteFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected $ = DeliveryNote;
  protected modelConfig = inject(DeliveryNoteModelConfig);
  protected formGroup: FormGroup<AocFormGroupType<DeliveryNote>>;
  protected restOptions: AocRestOptions<DeliveryNote> = {
    populate: {
      customer: true,
      fiscalYear: true,
      series: true,
      stockLineLineCollection: {
        item: {
          category: true,
          photo: true,
          tax: true
        },
        store: true,
        tax: true
      },
      fileCollection: true
    }
  };

  private questUtilsService = inject(QuestUtilsService);

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<DeliveryNote>>({
      stockLineLineCollection: new FormControl([]),
      fileCollection: new FormControl([])
    });
    this.questUtilsService.addControlsForDocumentTemplate('Delivery note', this.formGroup);
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 1400,
      height: 800
    };
  }
}
