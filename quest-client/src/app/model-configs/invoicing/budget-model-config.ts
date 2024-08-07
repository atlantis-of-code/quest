import { Injectable } from '@angular/core';
import {
  AocModelConfig,
  AocModelConfigAllow,
  AocModelConfigClientPayload,
  AocModelConfigFormImport,
  AocModelConfigFormResolver,
  AocModelConfigPath,
  AocModelConfigServerPayload
} from '@atlantis-of-code/aoc-client/core/configs';

import { Budget } from '../../models/invoicing/budget';
import { QuestDocumentPipe } from '../../pipes/quest-document.pipe';

/*@Pipe({
  name: 'Budget',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class BudgetModelConfig extends AocModelConfig<Budget> {
  constructor(
    private questDocumentPipe: QuestDocumentPipe
  ) {
    super(Budget);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'all';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<Budget> | AocModelConfigPath | AocModelConfigFormImport = {
    loadComponent: () => import('../../features/schemas/invoicing/budget/budget-form.component')
  };

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<Budget> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe*/
  override transform(budget: Budget): string {
    return this.questDocumentPipe.transform(budget, true);
  }
}
