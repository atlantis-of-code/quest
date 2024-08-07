import { inject, Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { combineLatest } from 'rxjs';
import { CompanyModelConfig } from '../model-configs/configuration/company-model-config';
import { Country } from '../models/common/country';
import { FiscalYear } from '../models/common/fiscal-year';
import { Gender } from '../models/common/gender';
import { IdentityDocumentType } from '../models/common/identity-document-type';
import { Language } from '../models/common/language';
import { PaymentSystem } from '../models/common/payment-system';
import { Series, SeriesType } from '../models/common/series';
import { StreetSuffix } from '../models/common/street-suffix';
import { Tax } from '../models/common/tax';
import { Company } from '../models/configuration/company';
import { Store } from '../models/items/store';

// Guard to be sure default values are loaded when starting the application
export const questDefaultsGuard = () => {
  return inject(QuestDefaultsService).ready();
}

@Injectable({providedIn: 'root'})
export class QuestDefaultsService {
  // Company
  $company: Company;
  get company() { return this.$company }

  // Default identity document type
  $identityDocumentType: IdentityDocumentType;
  get identityDocumentType() { return this.$identityDocumentType }

  // Default series
  $seriesForInvoice: Series;
  get seriesForInvoice() { return this.$seriesForInvoice }
  $seriesForDeliveryNote: Series;
  get seriesForDeliverynote() { return this.$seriesForDeliveryNote }
  $seriesForBudget: Series;
  get seriesForBudget() { return this.$seriesForBudget }
  $seriesForTicket: Series;
  get seriesForTicket() { return this.$seriesForTicket }

  // Default fiscal year
  $fiscalYear: FiscalYear
  get fiscalYear() { return this.$fiscalYear }

  // Country
  $country: Country;
  get country() { return this.$country }

  // Street suffix
  $streetSuffix: StreetSuffix;
  get streetSuffix() { return this.$streetSuffix }

  // Gender
  $gender: Gender;
  get gender() { return this.$gender }

  // Language
  $language: Language;
  get language() { return this.$language }

  // Tax
  $tax: Tax;
  get tax() { return this.$tax }

  // Store
  $store: Store;
  get store() { return this.$store }

  // Payment system
  $paymentSystem: PaymentSystem;
  get paymentSystem() { return this.$paymentSystem }

  // Determines if values are already loaded. Useful when logout / login is performed
  // as the guard will fire again and this value will be already true
  #ready = false;

  constructor(
    private aocRestService: AocRestService,
    private aocFormWindowService: AocFormWindowService,
    private companyModelConfig: CompanyModelConfig
  ) {}

  ready() {
    if (this.#ready) {
      return true;
    } else {
      // Not ready, get default values and resolve the promise for the guard.
      // A subscription keeps open. If default values change, objects will be updated.
      return new Promise<boolean | UrlTree>((resolve, reject) => {
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
          this.aocRestService.findOne$(Language, { is_default: true }),
          this.aocRestService.findOne$(Tax, { is_default: true }),
          this.aocRestService.findOne$(Store, { is_default: true }),
          this.aocRestService.findOne$(Company, { id: '1' }),
          this.aocRestService.findOne$(PaymentSystem, { is_default: true })
        ]).subscribe({
          next: results => {
            this.$identityDocumentType = results[0];
            this.$seriesForInvoice = results[1];
            this.$seriesForDeliveryNote = results[2];
            this.$seriesForBudget = results[3];
            this.$seriesForTicket = results[4];
            this.$fiscalYear = results[5];
            this.$country = results[6];
            this.$streetSuffix = results[7];
            this.$gender = results[8];
            this.$language = results[9];
            this.$tax = results[10];
            this.$store = results[11];
            this.$company = results[12];
            this.$paymentSystem = results[13];
            if (!this.$company) {
              this.aocFormWindowService.openUsingModelConfig({
                modelConfig: this.companyModelConfig,
                aocFormConfig: {
                  persistToDatabase: true
                },
                aocUiWindowDynConfig: {
                  closable: false,
                  modal: true
                }
              }).then();
            }
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
        return this.$seriesForInvoice;
      case 'Delivery note':
        return this.$seriesForDeliveryNote;
      case 'Budget':
        return this.$seriesForBudget;
      case 'Ticket':
        return this.$seriesForTicket;
    }
  }
}
