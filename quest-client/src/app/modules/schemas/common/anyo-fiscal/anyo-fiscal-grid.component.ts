import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnyoFiscalModelConfig } from '../../../../model-configs/common/anyo-fiscal-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AnyoFiscal } from '../../../../models/common/anyo-fiscal';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-anyo-fiscal-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    AocUiToolbarModule,
    AocUiInputTextModule,
    AocUiButtonModule,
    FormsModule,
    NgIf
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [columns]="columns"
      (selectionChange)="selected = $any($event)"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <input aocUiInputText aocUiValueAsNumber [(ngModel)]="anyoFiscal" style="width: 5rem">
        </aoc-ui-item>
        <aoc-ui-item>
          <button [disabled]="!anyoFiscal" label="Añadir" icon="add" aocUiButton (click)="agregarAnyoFiscal()"></button>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <button
            aocUiButton
            label="Cambiar a actual"
            [disabled]="selected.length !== 1 || selected[0].actual"
            (click)="cambiarAActual()"
          ></button>
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="actual" let-actual="value">
        <i *ngIf="actual" class="material-symbols-rounded">done</i>
      </ng-template>
    </aoc-grid>
  `
})
export default class AnyoFiscalGridComponent implements OnInit, OnDestroy {
  columns: AocGridColumn[];

  anyoFiscal: number = null;

  unsubscriber = new Subject<void>();

  selected: AnyoFiscal[] = [];

  constructor(
    public modelConfig: AnyoFiscalModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef,
    private aocRestService: AocRestService
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: '', display: [ AnyoFiscal.field.ACTUAL, aocUiTplRef('actual') ], size: '3rem', align: 'center', headerTooltip: 'Indica el año actual', sortable: false },
      { header: 'Año', display: AnyoFiscal.field.ANYO, defaultSort: 'desc' }
    ];
    this.aocUiWindowDynRef.show();
    this.listenToMaxAnyoFiscal();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  async agregarAnyoFiscal() {
    const nuevoAnyoFiscal = new AnyoFiscal();
    nuevoAnyoFiscal.anyo = this.anyoFiscal;
    await this.aocRestService.persist(AnyoFiscal, nuevoAnyoFiscal);
  }

  async cambiarAActual() {
    const seleccionado = this.selected[0];
    seleccionado.actual = true;
    await this.aocRestService.persist(AnyoFiscal, seleccionado);
  }

  listenToMaxAnyoFiscal() {
    this.aocRestService.findOne$(
      AnyoFiscal,
      { id: {$gt: '1' }},
      {
        orderBy: {
          anyo: 'desc'
        }
      }
    ).pipe(takeUntil(this.unsubscriber)).subscribe(anyoFiscal => {
      if (anyoFiscal) {
        this.anyoFiscal = anyoFiscal.anyo + 1;
      }
    });
  }
}
