import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AocFormController } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUnsubscribe } from '@atlantis-of-code/aoc-client/core/decorators';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import Big from 'big.js';
import { Subscription } from 'rxjs';
import { DocumentLineTemplate } from '../../../../models/templates/document-line-template';
import { DocumentTemplate } from '../../../../models/templates/document-template';
import { QuestPricePipe } from '../../../../pipes/quest-price.pipe';
import { QuestUtilsService } from '../../../../services/quest-utils.service';

@Component({
  selector: 'app-document-template-totals',
  standalone: true,
  styles: [`
    .totals {
      display: flex;
      justify-content: right;

      .numbers > div {
        text-align: right;
      }

      > div {
        padding: 0.25rem 1.2rem;
      }
    }
  `],
  imports: [
    QuestPricePipe
  ],
  template: `
    <div class="totals">
      <div>
        <div><strong>Total base</strong></div>
        <div><strong>Total taxes</strong></div>
        <div><strong>Total</strong></div>
      </div>
      <div class="numbers">
        <div>{{formGroup.controls.total_base.value | questPrice}}</div>
        <div>{{formGroup.controls.total_taxes.value | questPrice }}</div>
        <div><strong>{{formGroup.controls.total.value | questPrice}}</strong></div>
      </div>
    </div>
  `
})
export class DocumentTemplateTotalsComponent implements OnInit {
  @Input() formGroup: FormGroup<AocFormGroupType<DocumentTemplate>>;

  @Input() linesFormControl: AbstractControl<DocumentLineTemplate[] | DocumentTemplate[]>;

  @Input() mode: 'DocumentLine' | 'Document' = 'DocumentLine';

  @AocUnsubscribe
  private subscription: Subscription;

  private aocFormController = inject(AocFormController<DocumentTemplate>);
  private questUtilsService = inject(QuestUtilsService);

  ngOnInit() {
    this.handleFormController().then();
  }

  private async handleFormController() {
    await this.aocFormController.patched();
    this.subscription = this.linesFormControl.valueChanges.subscribe(newLines => {
      if (this.mode === 'DocumentLine') {
        this.recalculateTotalsAsDocumentLines(newLines as DocumentLineTemplate[]);
      } else {
        this.recalculateTotalsAsDocuments(newLines as DocumentTemplate[]);
      }
    });
  }

  private recalculateTotalsAsDocumentLines(newLines: DocumentLineTemplate[]) {
    const calculations = this.questUtilsService.calculateDocumentTotals(newLines);
    // Write to the control
    this.formGroup.controls.total_base.setValue(calculations.total_base);
    this.formGroup.controls.total_taxes.setValue(calculations.total_taxes);
    this.formGroup.controls.total.setValue(calculations.total);
  }

  private recalculateTotalsAsDocuments(newLines: DocumentTemplate[]) {
    let baseAcc = Big('0');
    let taxAcc = Big('0');
    let totalAcc = Big('0');
    for (const line of newLines) {
      if (line.isMarkedForDeletion()) {
        continue;
      }
      baseAcc = baseAcc.plus(line.total_base);
      taxAcc = taxAcc.plus(line.total_taxes);
      totalAcc = totalAcc.plus(line.total);
    }
    // Write to the control
    this.formGroup.controls.total_base.setValue(baseAcc.toString());
    this.formGroup.controls.total_taxes.setValue(taxAcc.toString());
    this.formGroup.controls.total.setValue(totalAcc.toString());
  }
}
