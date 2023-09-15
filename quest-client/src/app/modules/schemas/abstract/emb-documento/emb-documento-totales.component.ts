import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Big } from 'big.js';
import { AocFormController } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { EmbDocumento } from '../../../../models/abstract/emb-documento';
import { PrecioPipe } from '../../../../pipes/precio.pipe';

@Component({
  selector: 'app-emb-documento-totales',
  standalone: true,
  template: `
    <div class="emb-documento-totales">
      <div>
        <div><strong>Base</strong></div>
        <div><strong>Impuestos</strong></div>
        <div><strong>Total</strong></div>
      </div>
      <div class="emb-documento-totales-numeros">
        <div>{{formGroup.controls[EmbDocumentoClass.field.TOTAL_BASE].value | precio}}</div>
        <div>{{formGroup.controls[EmbDocumentoClass.field.TOTAL_IMPUESTOS].value | precio }}</div>
        <div><strong>{{formGroup.controls[EmbDocumentoClass.field.TOTAL].value | precio}}</strong></div>
      </div>
    </div>
  `,
  imports: [
    PrecioPipe
  ],
  styles: [`
    .emb-documento-totales {
      display: flex;
      justify-content: right;

      .emb-documento-totales-numeros > div {
        text-align: right;
      }

      > div {
        padding: 0.25rem 1.2rem;
      }
    }
  `]
})
export class EmbDocumentoTotalesComponent {
  EmbDocumentoClass = EmbDocumento;

  @Input()
  formGroup: UntypedFormGroup;

  _iva: string;
  @Input()
  set iva(_iva: string) {
    this._iva = _iva ?? '0.00';
    if (this.aocFormController?.isPatched()) { // Only when patched
      this.recalcularTotales();
    }
  }

  /*
  _lineasDocumento: EmbLineaDocumento[];
  @Input()
  set lineasDocumento(_lineasDocumento: EmbLineaDocumento[]) {
    this._lineasDocumento = _lineasDocumento;
    if (this.aocFormController?.isPatched()) { // Only when patched
      this.recalcularTotales();
    }
  }
   */

  _modelosConBase: Pick<EmbDocumento, 'total_base' | 'isMarkedForDeletion'>[]
  @Input()
  set modelosConBase(_modelosConBase: Pick<EmbDocumento, 'total_base' | 'isMarkedForDeletion'>[]) {
    this._modelosConBase = _modelosConBase;
    if (this.aocFormController.isPatched()) {
      this.recalcularTotales();
    }
  }

  constructor(
    private aocFormController: AocFormController
  ) { }

  private recalcularTotales() {
    let base = Big('0');
    for (const modeloConBase of this._modelosConBase.filter(ld => !ld.isMarkedForDeletion())) {
      base = base.plus(modeloConBase.total_base ?? '0');
    }
    const iva = base.mul(this._iva).div('100').round(2, Big.roundHalfEven);
    const total = base.plus(iva);
    this.formGroup.controls[EmbDocumento.field.TOTAL_BASE].setValue(base.toString());
    this.formGroup.controls[EmbDocumento.field.TOTAL_IMPUESTOS].setValue(iva.toString());
    this.formGroup.controls[EmbDocumento.field.TOTAL].setValue(total.toString());
  }
}
