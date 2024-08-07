import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AocFormController,
  AocFormModule,
  AocFormTitleProvider
} from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { CompanyModelConfig } from '../../../../model-configs/configuration/company-model-config';
import { Company } from '../../../../models/configuration/company';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { AddressTemplateSubformComponent } from '../../templates/address-template/address-template-subform.component';
import { ContactTemplateSubformComponent } from '../../templates/contact-template/contact-template-subform.component';
import {
  LegalDataTemplateSubformComponent
} from '../../templates/legal-data-template/legal-data-template-subform.component';

@Component({
  selector: 'app-company-form',
  standalone: true,
  providers: [ AocFormController ],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    LegalDataTemplateSubformComponent,
    ContactTemplateSubformComponent,
    AddressTemplateSubformComponent
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [newModelTitle]="newModelTitle">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Trade name" [formControlName]="CompanyClass.field.TRADE_NAME">
          </aoc-ui-form-row>
          <app-legal-data-template-subform [formGroupName]="CompanyClass.embedded.LEGAL_DATA_TEMPLATE"></app-legal-data-template-subform>
          <app-contact-template-subform [formGroupName]="CompanyClass.embedded.CONTACT_TEMPLATE"></app-contact-template-subform>
          <app-address-template-subform [formGroupName]="CompanyClass.embedded.ADDRESS_TEMPLATE"></app-address-template-subform>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class CompanyFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected CompanyClass = Company;
  protected modelConfig = inject(CompanyModelConfig);
  protected formGroup: FormGroup<AocFormGroupType<Company>>;
  protected newModelTitle: AocFormTitleProvider<Company>;

  private questUtilsService = inject(QuestUtilsService);
  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private aocFormController = inject(AocFormController);
  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Company>>({
      trade_name: new FormControl(null, Validators.required),
      legalDataTemplate: this.questUtilsService.addControlsForLegalDataTemplate(),
      contactTemplate: this.questUtilsService.addControlsForContactTemplate(),
      addressTemplate: this.questUtilsService.addControlsForAddressTemplate()
    });
    if (!this.aocUiWindowDynRef.aocUiWindowDynConfig.closable) {
      this.newModelTitle = _ => 'Company must be configured in order to use the application';
      this.aocFormController.addAfterSaveAction(_ => {
        window.location.reload();
      });
    }
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 720,
      height: 480,
    };
  }
}
