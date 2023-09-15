import { Component, OnDestroy, OnInit } from '@angular/core';
import { VehiculoModelConfig } from '../../../../model-configs/tecnicos/vehiculo-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Vehiculo } from '../../../../models/tecnicos/vehiculo';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatosFiscalesPipe } from '../../../../pipes/datos-fiscales.pipe';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-vehiculo-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    ReactiveFormsModule,
    AocUiInputCheckboxModule,
    AocUiToolbarModule,
    NgIf
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [where]="where"
      [restOptions]="restOptions"
      [columns]="columns"
    >
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Sólo habilitados" [formControl]="habilitadosFormControl">
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="habilitado" let-value="value">
        <i *ngIf="value" class="material-symbols-rounded">done</i>
        <i *ngIf="!value" class="material-symbols-rounded">block</i>
      </ng-template>
    </aoc-grid>
  `
})
export default class VehiculoGridComponent implements OnInit, OnDestroy {
  where: AocFilterQuery<Vehiculo> = {
    habilitado: true
  }

  restOptions: AocRestOptions<Vehiculo> = {
    populate: {
      tecnico: true
    }
  }

  columns: AocGridColumn<Vehiculo>[];

  habilitadosFormControl: UntypedFormControl;

  private globalUnsubscriber = new Subject<void>();

  constructor(
    public modelConfig: VehiculoModelConfig,
    private datosFiscalesPipe: DatosFiscalesPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Habilitado',
        display: [ Vehiculo.field.HABILITADO, aocUiTplRef('habilitado') ],
        size: '10rem',
        align: 'center'
      },
      {
        header: 'Nombre',
        display: Vehiculo.field.NOMBRE,
        defaultSort: 'asc'
      },
      {
        header: 'Matrícula',
        display: Vehiculo.field.MATRICULA
      },
      {
        header: 'Técnico asociado',
        display: [Vehiculo.entity.TECNICO, this.datosFiscalesPipe],
        orderBy: {
          tecnico: {
            nombre_fiscal: 'auto',
            apellido_1: 'auto',
            apellido_2: 'auto'
          }
        }
      }
    ];

    this.habilitadosFormControl = new UntypedFormControl(true);
    this.habilitadosFormControl.valueChanges.pipe(takeUntil(this.globalUnsubscriber)).subscribe((val: boolean) => {
      if (val) {
        this.where.habilitado = true;
      } else {
        delete this.where.habilitado;
      }
      this.where = {...this.where};
    })
  }

  ngOnDestroy() {
    this.globalUnsubscriber.next();
    this.globalUnsubscriber.complete();
  }
}
