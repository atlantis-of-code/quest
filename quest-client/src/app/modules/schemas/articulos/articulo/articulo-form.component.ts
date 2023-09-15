import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../../models/articulos/articulo';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocUiTabPanelModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-tab-panel';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { CategoriaSelectComponent } from '../categoria/categoria-select.component';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';
import { FotoFieldComponent } from '../../ficheros/foto-field.component';

@Component({
  selector: 'app-articulo-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-tab-panel>
          <aoc-ui-tab-panel-content header="Datos generales">
            <aoc-ui-form-page>
              <aoc-ui-form-row>
                <input type="checkbox" aocUiFormField="De alta" aocUiInputCheckbox [span]="3"
                       [formControlName]="ArticuloClass.field.DE_ALTA">
                <input aocUiFormField="Código" aocUiInputText aocUiValueAsNumber [span]="6"
                       [formControlName]="ArticuloClass.field.CODIGO">
                <input aocUiFormField="Nombre" aocUiInputText [span]="18"
                       [formControlName]="ArticuloClass.field.NOMBRE">
              </aoc-ui-form-row>
              <aoc-ui-form-row>
                <app-categoria-select aocUiFormField="Categoría" [span]="18"
                                      [formControlName]="ArticuloClass.entity.CATEGORIA"></app-categoria-select>
                <input aocUiFormField="Precio base" aocUiInputText [span]="6"
                       [formControlName]="ArticuloClass.field.PRECIO_BASE">
              </aoc-ui-form-row>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-foto-field
                  aocUiFormField="Fotografía"
                  [formControlName]="ArticuloClass.entity.FOTO"
                  [claseReferencia]="ArticuloClass"
                  directorio="artículos"
                ></app-foto-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
          <aoc-ui-tab-panel-content header="Ficheros">
            <aoc-ui-form-page>
              <aoc-ui-form-row aocUiFormRowHeight="stretch">
                <app-fichero-grid-field
                  aocUiFormField="Otros ficheros"
                  [claseReferencia]="ArticuloClass"
                  directorio="artículos"
                  subdirectorio="otros"
                  [formControlName]="ArticuloClass.collection.FICHERO"
                ></app-fichero-grid-field>
              </aoc-ui-form-row>
            </aoc-ui-form-page>
          </aoc-ui-tab-panel-content>
        </aoc-ui-tab-panel>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiTabPanelModule,
    AocUiFormModule,
    ReactiveFormsModule,
    AocUiInputCheckboxModule,
    AocUiInputTextModule,
    CategoriaSelectComponent,
    FotoFieldComponent,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class ArticuloFormComponent implements OnInit {
  ArticuloClass = Articulo;

  restOptions: AocRestOptions<Articulo> = {
    populate: {
      categoria: true,
      foto: true,
      ficheroCollection: true
    }
  };

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: ArticuloModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Articulo.field.DE_ALTA]: [true, Validators.required],
      [Articulo.field.CODIGO]: [null, AocUiValidators.positiveNumber(0)],
      [Articulo.field.NOMBRE]: [null, Validators.required],
      [Articulo.field.PRECIO_BASE]: ['0.00', [Validators.required, AocUiValidators.positiveNumber(2)]],
      [Articulo.entity.CATEGORIA]: [null],
      [Articulo.entity.FOTO]: [null],
      [Articulo.collection.FICHERO]: [[]]
    });
  }
}
