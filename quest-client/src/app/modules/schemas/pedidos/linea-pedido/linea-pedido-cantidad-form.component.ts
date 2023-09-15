import { Component, OnInit } from '@angular/core';
import { AocUiWindowDynConfig, AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiShareService } from '@atlantis-of-code/aoc-client/ui/common/services';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';

@Component({
  standalone: true,
  selector: 'app-linea-traspaso-cantidad-form',
  imports: [
    AocUiFormModule,
    AocUiInputTextModule,
    ReactiveFormsModule,
    AocUiButtonModule
  ],
  template: `
    <aoc-ui-form [formGroup]="formGroup">
      <ng-template aocUiFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Cantidad" formControlName="cantidad">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
      <ng-template aocUiFormTemplate="footer-right">
        <button aocUiButton label="Cancelar" (click)="cancelar()" icon="close"></button>
        <button aocUiButton type="submit" label="Seleccionar cantidad" icon="check" (click)="seleccionarCantidad()" [disabled]="!formGroup.valid"></button>
      </ng-template>
    </aoc-ui-form>
  `
})
export class LineaPedidoCantidadFormComponent implements OnInit {
  protected formGroup: UntypedFormGroup;

  constructor(
    private aocUiWindowDynRef: AocUiWindowDynRef,
    private aocUiWindowDynConfig: AocUiWindowDynConfig,
    private aocUiShareService: AocUiShareService
  ) {}

  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      cantidad: new FormControl<number>(1, [Validators.required, AocUiValidators.strictlyPositiveNumber(0)])
    });
    this.aocUiWindowDynRef.show();
  }

  protected seleccionarCantidad() {
    this.aocUiShareService.sendResponse(this.aocUiWindowDynConfig.aocUiShareId, this.formGroup.value.cantidad);
    this.aocUiWindowDynRef.close();
  }

  protected cancelar() {
    this.aocUiShareService.sendResponse(this.aocUiWindowDynConfig.aocUiShareId, 'cancelar');
    this.aocUiWindowDynRef.close();
  }
}
