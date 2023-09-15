import { EmbDocumento } from '../models/abstract/emb-documento';
import { EmbLineaDocumento } from '../models/abstract/emb-linea-documento';
import { Direccion } from '../models/common/direccion';
import { AocMisc } from '@atlantis-of-code/aoc-client/core/utils';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AnyoFiscal } from '../models/common/anyo-fiscal';
import { FechaPipe } from '../pipes/fecha.pipe';
import { PrecioPipe } from '../pipes/precio.pipe';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { MavermaDefaultsService } from './maverma-defaults.service';
import { EmbDireccion } from '../models/abstract/emb-direccion';
import { EmbDatosFiscales } from '../models/abstract/emb-datos-fiscales';
import { EmbInfoContacto } from '../models/abstract/emb-info-contacto';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { Fichero } from '../models/ficheros/fichero';
import { HttpClient } from '@angular/common/http';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { DatosFiscalesPipe } from '../pipes/datos-fiscales.pipe';


@Injectable({
  providedIn: 'root'
})
export class MavermaUtilsService {

  constructor(
    private datosFiscalesPipe: DatosFiscalesPipe,
    private fechaPipe: FechaPipe,
    private precioPipe: PrecioPipe,
    private fb: UntypedFormBuilder,
    private mavermaDefaults: MavermaDefaultsService,
    private httpClient: HttpClient,
    private aocConfig: AocConfig
  ) {
  }

  getRawDataFromFile(file: File) {
    return new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  async copyDocument(aocRestService: AocRestService, from: EmbDocumento, fromRowField: string, to: EmbDocumento, toRowField: string, toRowClass: new() => EmbLineaDocumento) {
    to.iva = from.iva;
    to.cliente = from.cliente;
    to.direccionFiscal = AocMisc.modelShallowClone(Direccion, from.direccionFiscal);
    to.direccionFiscal.id = undefined;
    to.direccionObra = AocMisc.modelShallowClone(Direccion, from.direccionObra);
    to.direccionObra.id = undefined;
    to.observaciones = from.observaciones;
    to.total_base = from.total_base;
    to.total_impuestos = from.total_impuestos;
    to.total = from.total;
    // to.anyoFiscal = (await aocRestService.listAsync(AnyoFiscal, {restOptions: {where: {[AnyoFiscal.field.ACTUAL]: true }}}))[0];
    // (to as any).id = `${AocUiIds.getNId()}`; // Dirty trick to not load default values
    const fromRows: EmbLineaDocumento[] = from[fromRowField];
    const toRows: EmbLineaDocumento[] = [];
    for (const fromRow of fromRows) {
      const toRow = new toRowClass();
      toRow.orden = fromRow.orden;
      toRow.codigo_articulo = fromRow.codigo_articulo;
      toRow.nombre_articulo = fromRow.nombre_articulo;
      toRow.articulo = fromRow.articulo;
      toRow.precio_base = fromRow.precio_base;
      toRow.cantidad = fromRow.cantidad;
      toRow.descuento = fromRow.descuento;
      toRow.total_base = fromRow.total_base;
      toRows.push(toRow);
    }
    to[toRowField] = toRows;
  }

  addEmbDocumentoControls(formGroup: UntypedFormGroup, clienteRequired = true) {
    formGroup.addControl(EmbDocumento.field.SERIE, this.fb.control(null));
    formGroup.addControl(EmbDocumento.entity.ANYO_FISCAL, this.fb.control(this.mavermaDefaults.anyoFiscal, Validators.required));
    formGroup.addControl(EmbDocumento.field.FECHA, this.fb.control(null));
    formGroup.addControl(EmbDocumento.field.NUMERO, this.fb.control(null, AocUiValidators.positiveNumber(0)));
    formGroup.addControl(EmbDocumento.entity.CLIENTE, this.fb.control(null, clienteRequired ? Validators.required: null));
    formGroup.addControl(EmbDocumento.field.IVA, this.fb.control(this.mavermaDefaults.empresa.iva, [Validators.required, AocUiValidators.positiveNumber(2)]));
    formGroup.addControl(EmbDocumento.field.TOTAL_BASE, this.fb.control('0.00', Validators.required));
    formGroup.addControl(EmbDocumento.field.TOTAL_IMPUESTOS, this.fb.control('0.00', Validators.required));
    formGroup.addControl(EmbDocumento.field.TOTAL, this.fb.control('0.00', Validators.required));
  }

  addEmbDireccionControls(formGroup: UntypedFormGroup = new UntypedFormGroup({})) {
    formGroup.addControl(EmbDireccion.field.NOMBRE_VIA, new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.BLOQUE, new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.PISO, new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.CODIGO_POSTAL,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.DATOS_ADICIONALES,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.EDIFICIO_O_URBANIZACION,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.ESCALERA,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.GEOPOSICION,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.LOCALIDAD,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.MUNICIPIO,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.NUMERO,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.PORTAL,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.PROVINCIA,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.field.PUERTA,new UntypedFormControl(null));
    formGroup.addControl(EmbDireccion.entity.DENOMINACION_VIA,new UntypedFormControl(this.mavermaDefaults.denominacionVia, {validators: Validators.required, initialValueIsDefault: true}));
    formGroup.addControl(EmbDireccion.entity.PAIS,new UntypedFormControl(this.mavermaDefaults.pais, {validators: Validators.required, initialValueIsDefault: true}));
    return formGroup;
  }

  addEmbDatosFiscalesControls(required: boolean, formGroup: UntypedFormGroup = new UntypedFormGroup({})) {
    formGroup.addControl(EmbDatosFiscales.field.NOMBRE_FISCAL, new UntypedFormControl(null, required ? Validators.required : null));
    formGroup.addControl(EmbDatosFiscales.field.APELLIDO_1, new UntypedFormControl(null));
    formGroup.addControl(EmbDatosFiscales.field.APELLIDO_2, new UntypedFormControl(null));
    formGroup.addControl(EmbDatosFiscales.entity.TIPO_DOCUMENTO, new UntypedFormControl(this.mavermaDefaults.tipoDocumento, required ? Validators.required : null));
    formGroup.addControl(EmbDatosFiscales.field.NUMERO_DOCUMENTO, new UntypedFormControl(null, required ? Validators.required : null));
    return formGroup;
  }

  addEmbInfoContactoControls(formGroup: UntypedFormGroup = new UntypedFormGroup({})) {
    formGroup.addControl(EmbInfoContacto.field.TELEFONO1, new UntypedFormControl(null));
    formGroup.addControl(EmbInfoContacto.field.TELEFONO2, new UntypedFormControl(null));
    formGroup.addControl(EmbInfoContacto.field.TELEFONO3, new UntypedFormControl(null));
    formGroup.addControl(EmbInfoContacto.field.EMAIL, new UntypedFormControl(null, Validators.email));
    return formGroup;
  }

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

  descargarFichero(fichero: Fichero) {
    if (!fichero) {
      return;
    }
    this.httpClient.get(`${this.aocConfig.SERVER_URL}ficheros/download/${fichero.id}`, {
      responseType: 'blob' as 'json',
      withCredentials: true
    }).subscribe((response: any) => {
      const dataType = response.type;
      const binaryData = [];
      binaryData.push(response);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      if (fichero.nombre) {
        downloadLink.setAttribute('download', fichero.nombre);
      }
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });

  }
}
