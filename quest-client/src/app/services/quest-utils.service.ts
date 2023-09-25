import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AocFormGroupType} from '@atlantis-of-code/aoc-client/core/types';
import {SeriesTypeType} from '../models/common/series';
import {Customer} from '../models/customers/customer';
import {AddressTemplate} from '../models/templates/address-template';
import {ContactTemplate} from '../models/templates/contact-template';
import {DocumentTemplate} from '../models/templates/document-template';
import {LegalDataTemplate} from '../models/templates/legal-data-template';
import {QuestDefaultsService} from './quest-defaults-service';


@Injectable({
  providedIn: 'root'
})
export class QuestUtilsService {

  constructor(
    private questDefaultsService: QuestDefaultsService
  ) {}

  addControlsForDocumentTemplate(formGroup: FormGroup<AocFormGroupType<DocumentTemplate>>, seriesType: SeriesTypeType) {
    formGroup.addControl(DocumentTemplate.field.DATE, new FormControl<Date>(null));
    formGroup.addControl(DocumentTemplate.field.NUMBER, new FormControl<number>(null));
    formGroup.addControl(DocumentTemplate.field.TOTAL_BASE, new FormControl<string>('0.00', Validators.required));
    formGroup.addControl(DocumentTemplate.field.TOTAL_TAXES, new FormControl<string>('0.00', Validators.required));
    formGroup.addControl(DocumentTemplate.field.TOTAL, new FormControl<string>('0.00', Validators.required));
    formGroup.addControl(DocumentTemplate.entity.FISCAL_YEAR, new FormControl(this.questDefaultsService.fiscalYear, Validators.required));
    formGroup.addControl(DocumentTemplate.entity.SERIES, new FormControl(this.questDefaultsService.seriesFor(seriesType)));
    formGroup.addControl(DocumentTemplate.entity.CUSTOMER, new FormControl<Customer>(null, Validators.required));
    return formGroup;
  }

  addControlsForAddressTemplate(formGroup: FormGroup<AocFormGroupType<AddressTemplate>>) {
    formGroup.addControl(AddressTemplate.field.ADDITIONAL_DATA, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.AREA, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.BLOCK, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.CITY, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.COORDINATES, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.DOOR, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.FLOOR, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.STATE, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.STREET_NAME, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.STREET_NUMBER, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.field.ZIP_CODE, new FormControl<string>(null));
    formGroup.addControl(AddressTemplate.entity.COUNTRY, new FormControl(this.questDefaultsService.country, Validators.required));
    formGroup.addControl(AddressTemplate.entity.STREET_SUFFIX, new FormControl(this.questDefaultsService.streetSuffix, Validators.required));
    return formGroup as AbstractControl;
  }

  addControlsForLegalDataTemplate(formGroup: FormGroup<AocFormGroupType<LegalDataTemplate>>) {
    formGroup.addControl(LegalDataTemplate.field.DOCUMENT_NUMBER, new FormControl<string>(null));
    formGroup.addControl(LegalDataTemplate.field.LEGAL_NAME, new FormControl<string>(null));
    formGroup.addControl(LegalDataTemplate.entity.IDENTITY_DOCUMENT_TYPE, new FormControl(this.questDefaultsService.identityDocumentType));
    return formGroup as AbstractControl;
  }

  addControlsForContactTemplate(formGroup: FormGroup<AocFormGroupType<ContactTemplate>>) {
    formGroup.addControl(ContactTemplate.field.EMAIL, new FormControl<string>(null));
    formGroup.addControl(ContactTemplate.field.FAX, new FormControl<string>(null));
    formGroup.addControl(ContactTemplate.field.PHONE1, new FormControl<string>(null));
    formGroup.addControl(ContactTemplate.field.PHONE2, new FormControl<string>(null));
    return formGroup;
  }

  /*
  commonEmbDocumentColumns(): AocGridColumn<EmbDocumento>[] {
    return [
      { header: 'A.fisc.', display: [EmbDocumento.entity.ANYO_FISCAL, AnyoFiscal.field.ANYO], align: 'right', size: '6rem' },
      { header: 'Serie', display: EmbDocumento.field.SERIE, align: 'right', size: '6rem' },
      { header: 'Número', display: EmbDocumento.field.NUMERO, align: 'right', size: '7rem' },
      { header: 'Fecha', display: [EmbDocumento.field.FECHA, this.fechaPipe], align: 'right', size: '7rem', defaultSort: 'desc' },
      {
        header: 'Cliente',
        display: [EmbDocumento.entity.CLIENTE, this.datosFiscalesPipe],
        orderBy: {
          cliente: {
            embDatosFiscales: {
              nombre_fiscal: 'auto',
              apellido_1: 'auto',
              apellido_2: 'auto'
            }
          }
        }
      },
      { header: 'Total base', display: [EmbDocumento.field.TOTAL_BASE, this.precioPipe], align: 'right', size: '10rem' },
      { header: 'Total imp.', display: [EmbDocumento.field.TOTAL_IMPUESTOS, this.precioPipe], align: 'right', size: '8rem' },
      { header: 'Total', display: [EmbDocumento.field.TOTAL, this.precioPipe], align: 'right', size: '10rem' },
    ];
  }
   */
}
