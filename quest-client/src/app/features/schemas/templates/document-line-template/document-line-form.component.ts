import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  AocUiWindowDynConfig,
  AocUiWindowDynConfigurable,
  AocUiWindowDynRef
} from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import {
  DocumentLineTemplateModelConfig
} from '../../../../model-configs/templates/document-line-template-model-config';
import { File } from '../../../../models/files/file';
import { DocumentLineTemplate } from '../../../../models/templates/document-line-template';
import { FilePreviewComponent } from '../../files/file-preview.component';

@Component({
  selector: 'app-document-line-form',
  standalone: true,
  providers: [AocFormController],
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    FilePreviewComponent,
    NgIf
  ],
  template: `
    <aoc-form [formGroup]="formGroup" [modelConfig]="modelConfig" [saveButtonWithTypeSubmit]="true">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Quantity" [formControlName]="$.field.QUANTITY" [autofocus]="true">
            <input *ngIf="!hasItem" aocUiInputText aocUiFormField="Base price" [formControlName]="$.field.BASE_PRICE">
            <input aocUiInputText aocUiFormField="Discount" [formControlName]="$.field.DISCOUNT">
          </aoc-ui-form-row>
          <aoc-ui-form-row *ngIf="!hasItem">
            <input aocUiInputText aocUiFormField="Name" [formControlName]="$.field.ITEM_NAME">
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch" *ngIf="hasItem">
            <app-file-preview aocUiFormRowElement [files]="files" [index]="0"></app-file-preview>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class DocumentLineFormComponent implements OnInit, AocUiWindowDynConfigurable {
  protected $ = DocumentLineTemplate;
  protected modelConfig = inject(DocumentLineTemplateModelConfig);
  protected formGroup = new FormGroup<AocFormGroupType<DocumentLineTemplate>>({
    quantity: new FormControl('1',[Validators.required, AocUiValidators.number()]),
    base_price: new FormControl('0.00'),
    discount: new FormControl('0', [Validators.required, AocUiValidators.numberInInterval(0, 100, 2)]),
    item_name: new FormControl(null)
  });
  protected aocFormController = inject(AocFormController<DocumentLineTemplate>);
  protected files: File[];
  protected hasItem = false;

  private aocUiWindowDynRef = inject(AocUiWindowDynRef);
  private cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.aocFormController.model().then(line => {
      if (line.item) {
        this.hasItem = true;
        if (line.item.photo) {
          this.files = [line.item.photo];
          this.cd.detectChanges();
        }
      } else {
        this.aocUiWindowDynRef.aocUiWindowDynConfig.height = 210;
      }
    });
  }

  createAocUiWindowDynConfig(): AocUiWindowDynConfig {
    return {
      width: 640,
      height: 640
    }
  }
}
