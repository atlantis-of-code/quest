import { inject, Injectable } from '@angular/core';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { combineLatest } from 'rxjs';
import { Country } from '../models/common/country';
import { FiscalYear } from '../models/common/fiscal-year';
import { IdentityDocumentType } from '../models/common/identity-document-type';
import { Series, SeriesType } from '../models/common/series';
import { StreetSuffix } from '../models/common/street-suffix';
import {Gender} from '../models/common/gender';
import {Language} from '../models/common/language';

// Guard to be sure default values are loaded when starting the application
export const questDefaultsGuard = () => {
  return inject(QuestDefaultsService).ready();
}

@Injectable({providedIn: 'root'})
export class QuestDefaultsService {
  // Default identity document type
  identityDocumentType: IdentityDocumentType;

  // Default series
  seriesForInvoice: Series;
  seriesForDeliveryNote: Series;
  seriesForBudget: Series;
  seriesForTicket: Series;

  // Default fiscal year
  fiscalYear: FiscalYear

  // Country
  country: Country;

  // Street suffix
  streetSuffix: StreetSuffix;

  // Gender
  gender: Gender;

  // Language
  language: Language;

  // Determines if values are already loaded. Useful when logout / login is performed
  // as the guard will fire again and this value will be already true
  #ready = false;

  constructor(private aocRestService: AocRestService) {}

  ready() {
    if (this.#ready) {
      return true;
    } else {
      // Not ready, get default values and resolve the promise for the guard.
      // A subscription keeps open. If default values change, objects will be updated.
      return new Promise<boolean>((resolve, reject) => {
        // Add a list of default database objects here to be available across the code
        combineLatest([
          this.aocRestService.findOne$(IdentityDocumentType, { is_default: true }),
          this.aocRestService.findOne$(Series, { is_default: true, type: 'Invoice' }),
          this.aocRestService.findOne$(Series, { is_default: true, type: 'Delivery note' }),
          this.aocRestService.findOne$(Series, { is_default: true, type: 'Budget' }),
          this.aocRestService.findOne$(Series, { is_default: true, type: 'Ticket' }),
          this.aocRestService.findOne$(FiscalYear, { is_current: true }),
          this.aocRestService.findOne$(Country, { is_default: true }),
          this.aocRestService.findOne$(StreetSuffix, { is_default: true }),
          this.aocRestService.findOne$(Gender, { is_default: true }),
          this.aocRestService.findOne$(Language, { is_default: true })
        ]).subscribe({
          next: results => {
            this.identityDocumentType = results[0];
            this.seriesForInvoice = results[1];
            this.seriesForDeliveryNote = results[2];
            this.seriesForBudget = results[3];
            this.seriesForTicket = results[4];
            this.fiscalYear = results[5];
            this.country = results[6];
            this.streetSuffix = results[7];
            this.gender = results[8];
            this.language = results[9];
            if (!this.#ready) {
              this.#ready = true;
              resolve(true);
            }
          },
          error: e => reject(e)
        });
      });
    }
  }

  // Some helper methods

  seriesFor(type: SeriesType) {
    switch (type) {
      case 'Invoice':
        return this.seriesForInvoice;
      case 'Delivery note':
        return this.seriesForDeliveryNote;
      case 'Budget':
        return this.seriesForBudget;
      case 'Ticket':
        return this.seriesForTicket;
    }
  }
}
