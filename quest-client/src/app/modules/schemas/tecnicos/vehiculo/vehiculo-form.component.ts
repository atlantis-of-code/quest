import { Component, OnInit } from '@angular/core';
import { VehiculoModelConfig } from '../../../../model-configs/tecnicos/vehiculo-model-config';
import { Vehiculo } from '../../../../models/tecnicos/vehiculo';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { TecnicoSelectComponent } from '../tecnico/tecnico-select.component';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';

@Component({
  selector: 'app-vehiculo-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre" [span]="14" [formControlName]="VehiculoClass.field.NOMBRE">
            <input aocUiInputText aocUiFormField="Matrícula" [span]="6"
                   [formControlName]="VehiculoClass.field.MATRICULA">
            <input type="checkbox" aocUiInputCheckbox aocUiFormField="Habilitado" [span]="4"
                   [formControlName]="VehiculoClass.field.HABILITADO">
          </aoc-ui-form-row>
          <aoc-ui-form-row>
            <app-tecnico-select aocUiFormField="Técnico asociado al vehículo"
                                [formControlName]="VehiculoClass.entity.TECNICO"></app-tecnico-select>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-fichero-grid-field
              aocUiFormField="Inspecciones técnicas"
              directorio="vehículos"
              subdirectorio="inspección técnica"
              [claseReferencia]="VehiculoClass"
              [formControlName]="VehiculoClass.collection.FICHERO_INSPECCION_TECNICA"
            ></app-fichero-grid-field>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-fichero-grid-field
              aocUiFormField="Facturas"
              directorio="vehículos"
              subdirectorio="facturas"
              [claseReferencia]="VehiculoClass"
              [formControlName]="VehiculoClass.collection.FICHERO_FACTURAS"
            ></app-fichero-grid-field>
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-fichero-grid-field
              aocUiFormField="Otros"
              directorio="vehículos"
              subdirectorio="otros"
              [claseReferencia]="VehiculoClass"
              [formControlName]="VehiculoClass.collection.FICHERO_OTROS"
            ></app-fichero-grid-field>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    TecnicoSelectComponent,
    FicheroGridFieldComponent,
    AocUiInputTextModule,
    AocUiInputCheckboxModule
  ],
  providers: [AocFormController]
})
export default class VehiculoFormComponent implements OnInit {
  VehiculoClass = Vehiculo;

  formGroup: UntypedFormGroup;

  restOptions: AocRestOptions<Vehiculo> = {
    populate: {
      tecnico: true,
      ficheroFacturasCollection: true,
      ficheroOtrosCollection: true,
      ficheroInspeccionTecnicaCollection: true
    }
  };

  constructor(
    public modelConfig: VehiculoModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Vehiculo.field.NOMBRE]: [null, Validators.required],
      [Vehiculo.field.MATRICULA]: [null],
      [Vehiculo.field.HABILITADO]: [true],
      [Vehiculo.entity.TECNICO]: [null],
      [Vehiculo.collection.FICHERO_OTROS]: [[]],
      [Vehiculo.collection.FICHERO_FACTURAS]: [[]],
      [Vehiculo.collection.FICHERO_INSPECCION_TECNICA]: [[]]
    });
  }
}
