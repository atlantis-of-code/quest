import { Component, OnInit } from '@angular/core';
import { AocUiWindowDynConfig, AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiShareService } from '@atlantis-of-code/aoc-client/ui/common/services';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { Articulo } from '../../../../models/articulos/articulo';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { Fichero } from '../../../../models/ficheros/fichero';
import { FotoViewerComponent } from '../../ficheros/foto-viewer.component';

@Component({
  selector: 'app-linea-traspaso-estoc-cantidad-form',
  template: `
    <aoc-ui-form [formGroup]="formGroup">
      <ng-template aocUiFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Cantidad" formControlName="cantidad">
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-foto-viewer aocUiFormRowElement="" [fichero]="foto"></app-foto-viewer>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
      <ng-template aocUiFormTemplate="footer-right">
        <button aocUiButton label="Cancelar" (click)="cancelar()" icon="close"></button>
        <button aocUiButton type="submit" label="Seleccionar cantidad" icon="check" (click)="seleccionarCantidad()" [disabled]="!formGroup.valid"></button>
      </ng-template>
    </aoc-ui-form>
  `,
  imports: [
    AocUiFormModule,
    AocUiInputTextModule,
    AocUiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FotoViewerComponent
  ],
  standalone: true
})
export class LineaTraspasoEstocCantidadFormComponent implements OnInit {
  protected formGroup: UntypedFormGroup;
  protected foto: Fichero;

  constructor(
    private aocUiWindowDynRef: AocUiWindowDynRef,
    private aocUiWindowDynConfig: AocUiWindowDynConfig,
    private aocUiShareService: AocUiShareService,
    private articuloModelConfig: ArticuloModelConfig
  ) {}

  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      cantidad: new FormControl<string>('1', [Validators.required, AocUiValidators.strictlyPositiveNumber()])
    });
    const config: { articulo: Articulo } = this.aocUiShareService.getConfiguration(this.aocUiWindowDynConfig.aocUiShareId);
    const articulo = config.articulo;
    this.foto = articulo.foto;
    this.aocUiWindowDynRef.header(`Cantidad para '${this.articuloModelConfig.transform(articulo)}'`);
    this.aocUiWindowDynRef.show();
  }

  seleccionarCantidad() {
    this.aocUiShareService.sendResponse(this.aocUiWindowDynConfig.aocUiShareId, this.formGroup.value.cantidad);
    this.aocUiWindowDynRef.close();
  }

  cancelar() {
    this.aocUiShareService.sendResponse(this.aocUiWindowDynConfig.aocUiShareId, 'cancelar');
    this.aocUiWindowDynRef.close();
  }
}
