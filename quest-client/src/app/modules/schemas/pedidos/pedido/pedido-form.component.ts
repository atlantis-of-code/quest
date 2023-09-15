import { Component, OnInit } from '@angular/core';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { PedidoModelConfig } from '../../../../model-configs/pedidos/pedido-model-config';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pedido } from '../../../../models/pedidos/pedido';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiDatetimePickerModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-datetime-picker';
import { ContratoSelectComponent } from '../../contratos/contrato/contrato-select';
import { RepartidorSelectComponent } from '../repartidor/repartidor-select.component';
import { RutaSelectComponent } from '../ruta/ruta-select.component';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { ModoDePagoSelectComponent } from '../../common/modo-de-pago/modo-de-pago-select.component';
import { AocUiTextareaModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-textarea';
import { LineaPedidoGridFieldComponent } from '../linea-pedido/linea-pedido-grid-field.component';
import { Subscription } from 'rxjs';
import { Big } from 'big.js';
import { AocFormGroupType } from '@atlantis-of-code/aoc-client/core/types';
import { PrecioPipe } from '../../../../pipes/precio.pipe';

@Component({
  standalone: true,
  selector: 'app-pedido-form',
  styles: [
    `
      // Totales row
      .pedido-totales {
        display: flex;
        justify-content: right;
        .pedido-totales-numeros > div {
          text-align: right;
        }
        > div {
          padding: 0.25rem 1.2rem;
        }
      }
    `
  ],
  providers: [ AocFormController ],
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiDatetimePickerModule,
    ReactiveFormsModule,
    ContratoSelectComponent,
    RepartidorSelectComponent,
    RutaSelectComponent,
    AocUiInputCheckboxModule,
    ModoDePagoSelectComponent,
    AocUiTextareaModule,
    LineaPedidoGridFieldComponent,
    PrecioPipe
  ],
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Alta en Nace" [formControlName]="PedidoClass.field.ALTA_EN_NACE" [span]="3">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Entregado" [formControlName]="PedidoClass.field.ENTREGADO" [span]="2">
            <aoc-ui-datetime-picker aocUiFormField="Fecha creación" [formControlName]="PedidoClass.field.FECHA_CREACION" mode="date" [span]="3"></aoc-ui-datetime-picker>
            <aoc-ui-datetime-picker aocUiFormField="Fecha entrega" [formControlName]="PedidoClass.field.FECHA_ENTREGA" mode="date" [span]="3"></aoc-ui-datetime-picker>
            <app-contrato-select aocUiFormField="Contrato" [populateBombonas]="true" [formControlName]="PedidoClass.entity.CONTRATO"></app-contrato-select>
            <app-modo-de-pago-select aocUiFormField="Modo de pago" [formControlName]="PedidoClass.entity.MODO_DE_PAGO" [span]="4"></app-modo-de-pago-select>
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <app-repartidor-select aocUiFormField="Repartidor" [formControlName]="PedidoClass.entity.REPARTIDOR"></app-repartidor-select>
            <app-ruta-select aocUiFormField="Ruta" [formControlName]="PedidoClass.entity.RUTA"></app-ruta-select>
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Ruta de guardia" [span]="4" [formControlName]="PedidoClass.field.RUTA_DE_GUARDIA">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Urgente" [formControlName]="PedidoClass.field.URGENTE">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Sumistro express" [formControlName]="PedidoClass.field.SUMINISTRO_EXPRESS">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Envío inmediato mov." [formControlName]="PedidoClass.field.ENVIO_INMEDIATO_MOVILIDAD">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Petición factura" [formControlName]="PedidoClass.field.PETICION_FACTURA">
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="10rem">
            <textarea aocUiTextarea aocUiFormField="Observaciones pedido" [formControlName]="PedidoClass.field.OBSERVACIONES_PEDIDO"></textarea>
            <textarea aocUiTextarea aocUiFormField="Observaciones cliente" [formControlName]="PedidoClass.field.OBSERVACIONES_CLIENTE"></textarea>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-linea-pedido-grid-field
              aocUiFormField="Líneas de pedido"
              [formControlName]="PedidoClass.collection.LINEA_PEDIDO"
            ></app-linea-pedido-grid-field>
          </aoc-ui-form-row>
          <div class="pedido-totales">
            <div>
              <div><strong>Impuestos</strong></div>
              <div><strong>Total</strong></div>
            </div>
            <div class="pedido-totales-numeros">
              <div>{{formGroup.controls[PedidoClass.field.TOTAL_IVA].value | precio }}</div>
              <div><strong>{{formGroup.controls[PedidoClass.field.TOTAL].value | precio }}</strong></div>
            </div>
          </div>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class PedidoFormComponent implements OnInit {
  protected PedidoClass = Pedido;

  protected formGroup: FormGroup<AocFormGroupType<Pedido>>;

  private subscription: Subscription;

  protected restOptions: AocRestOptions<Pedido> = {
    populate: {
      contrato: {
        cliente: true,
        contratoBombonaCollection: {
          bombona: true
        },
        descuentoCollection: true
      },
      ruta: true,
      repartidor: true,
      modoDePago: true,
      lineaPedidoCollection: {
        bombona: true
      }
    }
  }

  constructor(
    protected modelConfig: PedidoModelConfig,
    private fb: FormBuilder,
    private formController: AocFormController<Pedido>
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup<AocFormGroupType<Pedido>>({
      alta_en_nace: new FormControl(false, Validators.required),
      entregado: new FormControl(false, Validators.required),
      fecha_creacion: new FormControl(new Date(), Validators.required),
      fecha_entrega: new FormControl(null),
      suministro_express: new FormControl(false),
      total: new FormControl('0.00', Validators.required),
      total_iva: new FormControl('0.00', Validators.required),
      urgente: new FormControl(false, Validators.required),
      ruta_de_guardia: new FormControl(false, Validators.required),
      peticion_factura: new FormControl(false, Validators.required),
      envio_inmediato_movilidad: new FormControl(false, Validators.required),
      observaciones_pedido: new FormControl(null),
      observaciones_cliente: new FormControl(null),
      contrato: new FormControl(null, Validators.required),
      repartidor: new FormControl(null),
      ruta: new FormControl(null),
      modoDePago: new FormControl(null),
      lineaPedidoCollection: new FormControl([])
    });
    this.handleFormController().then();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async handleFormController() {
    // TODO: Check cálculos de totales, no cuadran
    await this.formController.patched();
    this.subscription = this.formGroup.controls.lineaPedidoCollection.valueChanges.subscribe(lineasPedido => {
      let totalIva = Big('0');
      let total = Big('0');
      for (const lineaPedido of lineasPedido.filter(lp => !lp.isMarkedForDeletion())) {
        const divisorIva = Big(lineaPedido.iva ?? '0').div(100).plus(1);
        const baseLinea = Big(lineaPedido.total_linea ?? '0').div(divisorIva).round(2, Big.roundDown);
        totalIva = totalIva.plus(lineaPedido.total_linea).sub(baseLinea);
        total = total.plus(lineaPedido.total_linea ?? '0');
      }
      this.formGroup.controls.total.setValue(total.toString());
      this.formGroup.controls.total_iva.setValue(totalIva.toString());
    });
  }
}
