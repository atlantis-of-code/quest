import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AocConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocModel, AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { lastValueFrom } from 'rxjs';
import { EmbDatosFiscales } from '../models/abstract/emb-datos-fiscales';
import { Cliente } from '../models/clientes/cliente';
import { TipoDocumento } from '../models/common/tipo-documento';
import { Contrato } from '../models/contratos/contrato';

declare var chrome;

interface NACEPayload {
  cliente: Cliente,
  contrato: Contrato
}

@Injectable({
  providedIn: 'root'
})
export class NaceConnectorService {

  public readonly extensionId = 'kkldgeknblbkkafklcddecdbanolopep';
  extensionInstalled = false;
  extensionVersion = null;
  extensionVersionName = null;
  extensionUpdateVersionName = null;
  extensionUpdateable = false;

  extensionURL = '';

  constructor(
    private aocRestService: AocRestService,
    private aocFormWindowService: AocFormWindowService,
    private ngZone: NgZone,
    private httpClient: HttpClient,
    private aocConfig: AocConfig,
    private aocUiToastMessageService: AocUiToastMessageService
  ) {
    this.checkIfExtensionIsInstalled();
    this.extensionURL = this.aocConfig.SERVER_URL + 'maverma-extension.zip'
  }

  checkIfExtensionIsInstalled() {
    console.log(chrome);

    // check new version (.json in public)
    // const params = new HttpParams({fromString: 'name=term'});

    chrome.runtime?.sendMessage(this.extensionId, { operation: 'get_manifest' }, (jsonManifest) => {
      if (jsonManifest != null) {
        this.extensionVersion = Number(jsonManifest.version);
        this.extensionVersionName = jsonManifest.version_name;
        this.extensionInstalled = true;
      }
      lastValueFrom(this.httpClient.request('GET', this.aocConfig.SERVER_URL + 'maverma-extension.json' , {
        responseType:'json', withCredentials: true
      })).then((jsonManifest: any) => {
        console.log(jsonManifest);
        this.extensionUpdateVersionName = jsonManifest.version_name;
        const updateVersion = Number(jsonManifest.version);
        if (this.extensionInstalled) {
          if (updateVersion > this.extensionVersion) {
            this.extensionUpdateable = true;
          }
        }
      });
    });
  }

  async getAndProcessPayload(): Promise<any> { // TODO: void
    return new Promise((resolve, reject) => {
      // @ts-ignore
      chrome.runtime.sendMessage(this.extensionId,
        { operation: 'get_payload' },
        (nacePayload: NACEPayload) => {
          console.log('response', window['structuredClone'](nacePayload));
          if (nacePayload) {
            nacePayload = NaceConnectorService.sanitize(nacePayload);
            const cliente = AocModelManager.populate(Cliente, nacePayload.cliente);
            const contrato = AocModelManager.populate(Contrato, nacePayload.contrato);
            this.ngZone.run(async () => {

              this.process(cliente, contrato).then(() => {
                console.log(cliente, contrato);
                resolve({
                  cliente,
                  contrato
                });
              });
            });
          } else {
            reject();
          }
        });
    });
  }

  private async process(cliente: Cliente, contrato: Contrato) {
    const clienteDB = await this.aocRestService.findOne(Cliente, {
      [Cliente.embedded.EMB_DATOS_FISCALES]: {
        [EmbDatosFiscales.field.NUMERO_DOCUMENTO]: cliente.embDatosFiscales.numero_documento
      }
    });
    // let cliente: Cliente;
    let clienteAlreadyInDBButDifferent = false;
    if (clienteDB) {
      console.log('ok tenc un cliente ja');
      console.log('cliente de db:', clienteDB);
      console.log('cliente nace:', cliente);
      const resultadosComparacion = NaceConnectorService.compareClientes(cliente, clienteDB);
      if (resultadosComparacion) { // son diferentes!
        console.log('SON DIFERENTES!');

        clienteAlreadyInDBButDifferent = true;
        // TODO

      } else {
        console.log('SON IGUALES, SEGUIMOS!');
        cliente = clienteDB;
      }
    }
    // NO LO TENEMOS, LO CREAMOS NUEVO, O YA LO TENEMOS PERO ES DIFERENTE
    if (!clienteDB || clienteAlreadyInDBButDifferent) {
      const tipoDocumentoDB = await this.aocRestService.findOne(TipoDocumento, {
        [TipoDocumento.field.NOMBRE]: cliente.embDatosFiscales.tipoDocumento.nombre
      });
      if (tipoDocumentoDB) {
        cliente.embDatosFiscales.tipoDocumento = tipoDocumentoDB;
      } else {
        const tipoDocumento = new TipoDocumento();
        tipoDocumento.nombre = cliente.embDatosFiscales.tipoDocumento.nombre;
        cliente.embDatosFiscales.tipoDocumento = tipoDocumento;
      }

      if (clienteAlreadyInDBButDifferent) { // SI YA LO TENIAMOS PERO ES DIFERENTE, ABRIMOS FORM DE CLIENTE
          const response = await this.aocFormWindowService.openRoute<Cliente>({
            path: ['clientes', 'cliente', 'form'],
            aocFormConfig: {
              model: cliente,
              persistToDatabase: true,
              disableSafeClose: false
            }
          });
          cliente = response.model;
          console.log('response', response);
      }

      // PASAMOS AL CONTRATO, AQUI SIEMPRE ABRIMOS FORM

      // TODO: MIRAR SI LA POLIZA YA EXISTE (POR NUMERO)

      contrato.cliente = cliente;

      console.log(contrato);

      const response = await this.aocFormWindowService.openRoute<Contrato>({
        path: ['contratos', 'contrato', 'form'],
        aocFormConfig: {
          model: contrato,
          persistToDatabase: true,
          disableSafeClose: false
        }
      });
      console.log('response', response);

      if (response.type === 'save') {
        this.aocUiToastMessageService.showSuccess('Contrato procesado con éxito.');
      }

    }

    console.log(cliente);

  }

  private static toDate(value: string): Date {
    if (value) {
      console.log(value);
      const values = value.split("/");
      // month is 0-based, that's why we need values[1] - 1
      return new Date(+values[2], +values[1] - 1, +values[0]);
    } else {
      return null;
    }
  }

  private static toBig(value: string): string {
    if (value) {
      value = value.replace(/\./g, ''); // llevam tots els .
      return value.replace(/,/g, '.'); // passam la , a .
    } else {
      return null;
    }
  }

  private static toNumber(value: string): number {
    if (value) {
      value = value.replace(/\./g, ''); // llevam tots els .
      value = value.replace(/,/g, '.'); // passam la , a .
      return parseFloat(value);
    } else {
      return null;
    }
  }

  private static sanitize(nacePayload: NACEPayload): { cliente: Cliente, contrato: Contrato } {
    const clienteMeta = AocModelManager.meta(Cliente);
    const contratoMeta = AocModelManager.meta(Contrato);

    console.log(clienteMeta, contratoMeta);

    nacePayload.cliente = NaceConnectorService.convert(Cliente, nacePayload.cliente, {});
    nacePayload.contrato = NaceConnectorService.convert(Contrato, nacePayload.contrato, {});
    console.log('FINAL CLIENTE:', nacePayload.cliente);
    console.log('FINAL CONTRATO:', nacePayload.contrato);

    return nacePayload;
  }

  private static convert<T extends AocModel>(modelClass: new () => T, model: T, newModel: any) {
    const modelMeta = AocModelManager.meta(modelClass);
    for (const field of Object.entries(modelMeta.fields)) {
      const fieldName = field[0];
      const fieldMeta = field[1];
      console.log(fieldName, fieldMeta);
      if (!(fieldName in model)) {
        console.warn(`${fieldName} is not in the NACE payload`);
      } else {
        if (fieldMeta.isEntity || fieldMeta.isEmbedded) {
          newModel[fieldName] = this.convert(fieldMeta.type as new () => T, model[fieldName], new (fieldMeta.type as any)());
        } else if (fieldMeta.isCollection) {
          const collectionModels = [];
          console.log(fieldName);
          for (const subModel of model[fieldName] ?? []) {
            collectionModels.push(this.convert(fieldMeta.type as new () => T, subModel, new (fieldMeta.type as any)() ));
          }
          newModel[fieldName] = collectionModels;
        } else {
          if (fieldMeta.type === 'string') {
            newModel[fieldName] = model[fieldName];
          } else if (fieldMeta.type === 'number') {
            newModel[fieldName] = this.toNumber(model[fieldName]);
          } else if (fieldMeta.type === 'date') {
            newModel[fieldName] = this.toDate(model[fieldName]);
          } else if (fieldMeta.type === 'boolean') {
            newModel[fieldName] = Boolean(this.toDate(model[fieldName]));
          } else if (fieldMeta.type === 'big') {
            newModel[fieldName] = this.toBig(model[fieldName]);
          }
        }
      }
    }
    return newModel;
  }

  private static compareClientes(cliente: Cliente, clienteDB: Cliente): string[] {
    let diffs = null;
    const clienteFlat = NaceConnectorService.flattenObject(cliente);
    const clienteDBFlat = NaceConnectorService.flattenObject(clienteDB);
    for (const field in clienteFlat) {
      if (field in clienteDBFlat && clienteFlat[field] === clienteDBFlat[field]) {
        const diffStr = `El campo ${field} SI coincide: ${clienteFlat[field]} vs ${clienteDBFlat[field]}`;
        console.log(diffStr);
      } else {
        diffs ??= [];
        const diffStr = `El campo ${field} NO coincide: ${clienteFlat[field]} vs ${clienteDBFlat[field]}`;
        diffs.push(diffStr);
        console.log(diffStr);
      }
    }
    return diffs;
  }

  /**
   * @param ob Object                 The object to flatten
   * @param prefix String (Optional)  The prefix to add before each key, also used for recursion
   **/
  private static flattenObject(ob, prefix = '', result = null) {
    result = result || {};

    // Preserve empty objects and arrays, they are lost otherwise
    /*if (prefix && typeof ob === 'object' && ob !== null && Object.keys(ob).length === 0) {
      result[prefix] = Array.isArray(ob) ? [] : {};
      return result;
    }*/

    prefix = prefix ? prefix + '.' : '';

    for (const i in ob) {
      if (Object.prototype.hasOwnProperty.call(ob, i) && !i.startsWith('__')) {
        if (typeof ob[i] === 'object' && ob[i] !== null) {
          // Recursion on deeper objects
          this.flattenObject(ob[i], prefix + i, result);
        } else {
          result[prefix + i] = ob[i];
        }
      }
    }
    return result;
  }

  /*openPopup() {
    chrome.runtime.sendMessage(this.extensionId, { operation: 'open_popup' }, (response) => {
    });
  }*/
}
