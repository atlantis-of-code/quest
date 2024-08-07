import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { StoreTransferModelConfig } from '../../../../model-configs/items/store-transfer-model-config';
import { StoreTransfer } from '../../../../models/items/store-transfer';
import { StoreTransferLine } from '../../../../models/items/store-transfer-line';
import { StoreTransferLineGridFieldComponent } from '../store-transfer-line/store-transfer-line-grid-field.component';
import { StoreAutocompleteComponent } from '../store/store-autocomplete.component';

@Component({
  selector: 'app-store-transfer-form',
  standalone: true,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    StoreAutocompleteComponent,
    StoreTransferLineGridFieldComponent
  ],
  providers: [ AocFormController ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <app-store-autocomplete aocUiFormField="Source store" [formControlName]="$.entity.SOURCE_STORE"></app-store-autocomplete>
            <app-store-autocomplete aocUiFormField="Target store" [formControlName]="$.entity.TARGET_STORE"></app-store-autocomplete>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-store-transfer-line-grid-field aocUiFormField="Articles to transfer" [formControlName]="$.collection.STORE_TRANSFER_LINE"></app-store-transfer-line-grid-field>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class StoreTransferFormComponent implements AocUiWindowDynConfigurable {
  protected $ = StoreTransfer;
  protected modelConfig = inject(StoreTransferModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<StoreTransfer>>({
    sourceStore: new FormControl(null, Validators.required),
    targetStore: new FormControl(null, Validators.required),
    storeTransferLineCollection: new FormControl([], (ctrl) => {
      const lines: StoreTransferLine[] = ctrl?.value ?? [];
      if (lines.filter(l => !l.isMarkedForDeletion()).length) {
        return null;
      }
      return { 'At least one transfer line is needed to perform the operation': true };
    })
  });
  protected restOptions: AocRestOptions<StoreTransfer> = {
    populate: {
      sourceStore: true,
      targetStore: true,
      storeTransferLineCollection: {
        item: true
      }
    }
  };

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 800,
      height: 640
    };
  }
}
