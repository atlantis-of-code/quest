import { Injectable } from '@angular/core';
import { Pais } from '../models/common/pais';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { DenominacionVia } from '../models/common/denominacion-via';
import { AnyoFiscal } from '../models/common/anyo-fiscal';
import { Empresa } from '../models/configuracion/empresa';
import { combineLatest } from 'rxjs';
import { TipoDocumento } from '../models/common/tipo-documento';
import { AlmacenGas } from '../models/configuracion/almacen-gas';
import { Almacen } from '../models/articulos/almacen';

@Injectable({ providedIn: 'root' })
export class MavermaDefaultsService {

  public pais: Pais;
  public denominacionVia: DenominacionVia;
  public anyoFiscal: AnyoFiscal;
  public empresa: Empresa;
  public tipoDocumento: TipoDocumento;
  public almacenGas: AlmacenGas;
  public almacen: Almacen;

  constructor(
    private aocRestService: AocRestService
  ) {
  }

  ready(): Promise<boolean> {
    let firstValue = true;
    return new Promise<boolean>((resolve, reject) => {
      combineLatest([
        this.aocRestService.findOne$(Pais, {nombre: 'España'}),
        this.aocRestService.findOne$(DenominacionVia, {nombre: 'Calle'}),
        this.aocRestService.findOne$(AnyoFiscal, {actual: true}),
        this.aocRestService.findOne$(Empresa, {id: '1'}),
        this.aocRestService.findOne$(TipoDocumento, {nombre: 'NIF'}),
        this.aocRestService.findOne$(AlmacenGas, {codigo: '0080107085'}),
        this.aocRestService.findOne$(Almacen, { id: '1' })
      ]).subscribe({
        next: (arr) => {
          this.pais = arr[0];
          this.denominacionVia = arr[1];
          this.anyoFiscal = arr[2];
          this.empresa = arr[3];
          this.tipoDocumento = arr[4];
          this.almacenGas = arr[5];
          this.almacen = arr[6];
          if (firstValue) {
            resolve(true);
            firstValue = false;
          }
        },
        error: e => reject(e)
      });
    });
  }

}
