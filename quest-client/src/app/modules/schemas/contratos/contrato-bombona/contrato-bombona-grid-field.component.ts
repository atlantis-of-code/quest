import { Component, OnInit } from '@angular/core';
import { ContratoBombonaModelConfig } from '../../../../model-configs/contratos/contrato-bombona-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { ContratoBombona } from '../../../../models/contratos/contrato-bombona';
import { Bombona } from '../../../../models/articulos/bombona';
import { UntypedFormControl, NgControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { PesoPipe } from '../../../../pipes/peso.pipe';
import { Big } from 'big.js';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { BombonaSelectComponent } from '../../articulos/bombona/bombona-select.component';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-contrato-bombona-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    BombonaSelectComponent,
    AocUiItemModule,
    FormsModule,
    ReactiveFormsModule,
    AocUiToolbarModule,
    AocUiButtonModule,
    AocUiInputTextModule
  ],
  template: `
    <aoc-grid-field [modelConfig]="modelConfig" [columns]="columns">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <app-bombona-select [(ngModel)]="selectedBombona" [revokePermissions]="true"></app-bombona-select>
        </aoc-ui-item>
        <aoc-ui-item>
          <button aocUiButton label="Añadir bombona al contrato" [disabled]="!selectedBombona"
                  (click)="addBombona()"></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="cantidadEdit" let-formControl="formControl">
        <input aocUiInputText aocUiValueAsNumber [formControl]="formControl">
      </ng-template>
      <ng-template aocGridCell="fianzaEdit" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>
    </aoc-grid-field>
  `
})
export class ContratoBombonaGridFieldComponent implements OnInit {
  columns: AocGridColumn[];

  selectedBombona: Bombona;

  constructor(
    public modelConfig: ContratoBombonaModelConfig,
    private ngControl: NgControl,
    private precioPipe: PrecioPipe,
    private pesoPipe: PesoPipe,
    private aocUiToastMessageService: AocUiToastMessageService
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Código Mav',
        display: [ContratoBombona.entity.BOMBONA, Bombona.field.CODIGO_MAVERMA],
        defaultSort: 'asc',
        size: '9rem'
      },
      {
        header: 'Código NACE',
        display: [ContratoBombona.entity.BOMBONA, Bombona.field.CODIGO_NACE],
        size: '10rem'
      },
      {
        header: 'Cantidad contratada',
        display: ContratoBombona.field.CANTIDAD_CONTRATADA,
        align: 'right',
        editable: [aocUiTplRef('cantidadEdit'), new UntypedFormControl(0, [Validators.required, AocUiValidators.positiveNumber(0)])]
      },
      {
        header: 'Cantidad entregada',
        display: ContratoBombona.field.CANTIDAD_ENTREGADA,
        align: 'right',
        editable: [aocUiTplRef('cantidadEdit'), new UntypedFormControl(0, [Validators.required, AocUiValidators.positiveNumber(0)])]
      },
      {
        header: 'Fianza (ud.)',
        align: 'right',
        display: [ContratoBombona.field.FIANZA, this.precioPipe],
        editable: [aocUiTplRef('fianzaEdit'), new UntypedFormControl(0, [Validators.required, AocUiValidators.positiveNumber(2)])]
      },
      {
        header: 'Capacidad',
        align: 'right',
        display: (contratoBombona: ContratoBombona) => {
          const cantidadContratada = contratoBombona.cantidad_contratada ?? 0;
          const peso = contratoBombona.bombona.peso;
          const calculoPeso = Big(peso).mul(cantidadContratada).toString();
          return this.pesoPipe.transform(calculoPeso);
        },
        sortable: false
      }
    ]
  }

  addBombona() {
    if (!this.selectedBombona) {
      return;
    }
    const current: ContratoBombona[] = this.ngControl.control.value;
    const alreadyInList = current.find(cb => cb.bombona.id === this.selectedBombona.id);
    if (alreadyInList) {
      this.aocUiToastMessageService.showInfo('La bombona ya está incluída en este contrato', 'Atención');
      return;
    }
    const contratoBombona = new ContratoBombona();
    contratoBombona.bombona = this.selectedBombona;
    contratoBombona.cantidad_contratada = 0;
    contratoBombona.cantidad_entregada = 0;
    contratoBombona.fianza = this.selectedBombona.fianza;
    current.push(contratoBombona);
    this.ngControl.control.setValue(current);
    this.selectedBombona = null;
  }
}
