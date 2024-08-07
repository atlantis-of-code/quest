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

import { StockLog } from '../../models/items/stock-log';

/*@Pipe({
  name: 'StockLog',
  standalone: true
})*/
@Injectable({
  providedIn: 'root'
})
export class StockLogModelConfig extends AocModelConfig<StockLog> {
  constructor() {
    super(StockLog);
  }

  // Default read, write, delete and clone permissions
  readonly allow: AocModelConfigAllow = 'none';

  /*
   * Form options:
   * AocModelConfigFormatResolver: resolve form location by preprocessing information
   * AocModelConfigFormPath: route path to this model form
   * AocModelConfigFormImport: lazy loading import a form using its path (recommended)
   */
  readonly form: AocModelConfigFormResolver<StockLog> | AocModelConfigPath | AocModelConfigFormImport;

  // Filter definition for payloads sent by grids and autocompletes
  // AocModelConfigClientPayload is used to define here the AocFilterQuery for a given payload search term
  // AocModelConfigServer if a server side filter or query builder must be used to filter for a given payload search term
  readonly payload: AocModelConfigClientPayload<StockLog> | AocModelConfigServerPayload;

  /* This method is compatible with Angular Pipe, so the model config can be also used as a @Pipe
  override transform(stockLog: StockLog): string {
    return stockLog?.toString() ?? '';
  }*/
}
