import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { TraspasoEstoc } from '../../../../models/articulos/traspaso-estoc';
import { TraspasoEstocModelConfig } from '../../../../model-configs/articulos/traspaso-estoc-model-config';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { Almacen } from '../../../../models/articulos/almacen';
import { AocModelEmitter, AocModelListener } from '@atlantis-of-code/aoc-client/core/utils';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AlmacenSelectComponent } from '../almacen/almacen-select.component';
import {
  LineaTraspasoEstocGridFieldComponent
} from '../linea-traspaso-estoc/linea-traspaso-estoc-grid-field.component';

@Component({
  selector: 'app-traspaso-estoc-form',
  standalone: true,
  template: `
    <aoc-form
      [formGroup]="formGroup"
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <app-almacen-select aocUiFormField="Almacén origen" [modelEmitter]="almacenOrigenEmitter"
                                [formControlName]="TraspasoEstocClass.entity.ALMACEN_ORIGEN"></app-almacen-select>
            <app-almacen-select aocUiFormField="Almacén destino" [modelListener]="almacenDestinoListener"
                                [formControlName]="TraspasoEstocClass.entity.ALMACEN_DESTINO"></app-almacen-select>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-traspaso-estoc-movimiento-grid-field aocUiFormField="Movimientos"
                                                      [formControlName]="TraspasoEstocClass.collection.LINEA_TRASPASO_ESTOC"></app-traspaso-estoc-movimiento-grid-field>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    AlmacenSelectComponent,
    LineaTraspasoEstocGridFieldComponent,
    ReactiveFormsModule
  ],
  providers: [AocFormController]
})
export default class TraspasoEstocFormComponent implements OnInit {
  TraspasoEstocClass = TraspasoEstoc;

  restOptions: AocRestOptions<TraspasoEstoc> = {
    populate: {
      almacenOrigen: true,
      almacenDestino: true,
      lineaTraspasoEstocCollection: {
        articulo: true
      }
    }
  };

  almacenOrigenEmitter = new AocModelEmitter<Almacen>();
  almacenDestinoListener = new AocModelListener<Almacen>([
    {
      type: 'filter query',
      emitter: this.almacenOrigenEmitter,
      filterQuery: (almacenOrigen: Almacen) => almacenOrigen ? ({ id: {$ne: almacenOrigen?.id }}) : ({id: '-1'})
    }
  ]);

  formGroup: UntypedFormGroup;
  constructor(
    public modelConfig: TraspasoEstocModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [TraspasoEstoc.field.FECHA]: [new Date(), Validators.required],
      [TraspasoEstoc.entity.ALMACEN_ORIGEN]: [null, Validators.required],
      [TraspasoEstoc.entity.ALMACEN_DESTINO]: [null, Validators.required],
      [TraspasoEstoc.collection.LINEA_TRASPASO_ESTOC]: [[]]
    });
  }
}
