import { Component, OnInit } from '@angular/core';
import { AparatoModelConfig } from '../../../../model-configs/contratos/aparato-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Aparato } from '../../../../models/contratos/aparato';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-aparato-grid-field',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
    >
      <!--
      <ng-template aocUiToolbar="left">
        <aoc-ui-toolbar-item>
          <input aocUiInputText style="width: 25rem" [(ngModel)]="nombreAparato" (keyup.enter)="this.nombreAparato && agregarAparato()">
        </aoc-ui-toolbar-item>
        <aoc-ui-toolbar-item>
          <button
            aocUiButton
            label="Agregar aparato"
            icon="fas fa-plus"
            [disabled]="!this.nombreAparato"
            (click)="agregarAparato()"></button>
        </aoc-ui-toolbar-item>
      </ng-template>

      <ng-template [aocGridCell]="AparatoClass.field.NOMBRE" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>

      <ng-template [aocGridCell]="AparatoClass.field.CANTIDAD" let-formControl="formControl">
        <input aocUiInputText aocUiNumber [allowNegative]="false" [allowDecimals]="false" [formControl]="formControl">
      </ng-template>

        -->
    </aoc-grid-field>
  `
})
export class AparatoGridFieldComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: AparatoModelConfig
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Año', display: Aparato.field.ANYO, align: 'right', size: '8rem',defaultSort: 'desc' },
      { header: 'Tipo', display: Aparato.field.TIPO },
      { header: 'Marca', display: Aparato.field.MARCA },
      { header: 'Modelo', display: Aparato.field.MODELO },
      { header: 'Potencia', display: Aparato.field.POTENCIA, align: 'right', size: '8rem' }
    ];
  }

  /*
  agregarAparato() {
    const nuevoAparato = new Aparato();
    nuevoAparato.nombre = this.nombreAparato;
    nuevoAparato.cantidad = '1';
    const current: Aparato[] = this.ngControl.control.value;
    current.push(nuevoAparato);
    this.nombreAparato = null;
    this.ngControl.control.setValue(current);
  }
   */
}
