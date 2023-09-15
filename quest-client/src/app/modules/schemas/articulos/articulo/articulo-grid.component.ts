import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { AocFilterQuery, AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Articulo } from '../../../../models/articulos/articulo';
import { AocGridColumn, AocGridGroupConfig } from '@atlantis-of-code/aoc-client/core/types';
import { Categoria } from '../../../../models/articulos/categoria';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { AocModelEmitter } from '@atlantis-of-code/aoc-client/core/utils';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AocUiNgClass } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocUiTableRow } from '@atlantis-of-code/aoc-client/ui/data/aoc-ui-table';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';
import { CategoriaSelectComponent } from '../categoria/categoria-select.component';

@Component({
  selector: 'app-articulo-grid',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    ReactiveFormsModule,
    AocUiToolbarModule,
    AocUiInputCheckboxModule,
    CategoriaSelectComponent,
    AocUiVerticalSeparatorModule
  ],
  template: `
    <aoc-grid
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [where]="where"
      [columns]="columns"
      [modelEmitter]="modelEmitter"
      [groupConfig]="groupConfig"
      [rowNgClass]="rowClass"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Agrupar por categoría" [formControl]="groupControl">
        </aoc-ui-item>
      </ng-template>
      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="De alta" [formControl]="deAltaControl">
        </aoc-ui-item>
        <aoc-ui-item>
          <app-categoria-select placeholder="Filtrar por categoría..." allow="none"
                                [formControl]="categoriaControl"></app-categoria-select>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
      </ng-template>
    </aoc-grid>
  `
})
export class ArticuloGridComponent implements OnInit, OnDestroy {
  @Input()
  modelEmitter: AocModelEmitter<Articulo>;

  where: AocFilterQuery<Articulo> = {
    de_alta: true
  };

  restOptions: AocRestOptions<Articulo> = {
    populate: {
      categoria: true
    }
  };

  columns: AocGridColumn[];

  rowClass: AocUiNgClass = (row: AocUiTableRow<Articulo>) => {
    return {
      baja: !row.data.de_alta
    }
  };

  groupConfigTemplate:AocGridGroupConfig<string> = {
    display: [Articulo.entity.CATEGORIA, Categoria.field.NOMBRE],
    noGroupRenderer: _ => 'Sin categoría asignada',
    compareFn: 'auto',
    trackBy: nombre => nombre
  };
  groupConfig: AocGridGroupConfig<string>;
  groupControl: FormControl;
  groupSubscription: Subscription;

  categoriaControl: FormControl;
  categoriaControlSubscription: Subscription;

  deAltaControl: FormControl;
  deAltaControlSubscription: Subscription;

  constructor(
    public modelConfig: ArticuloModelConfig,
    private precioPipe:PrecioPipe
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Código',
        display: Articulo.field.CODIGO,
        size: '10rem',
        align: 'right',
        defaultSort: 'asc'
      },
      {
        header: 'Nombre',
        display: Articulo.field.NOMBRE
      },
      {
        header: 'Categoría',
        display: [Articulo.entity.CATEGORIA, Categoria.field.NOMBRE]
      },
      {
        header: 'Precio base',
        display: [Articulo.field.PRECIO_BASE, this.precioPipe],
        size: '10rem',
        align: 'right',
      }
    ];
    // Group handling
    this.groupControl = new FormControl(false);
    this.groupSubscription = this.groupControl.valueChanges.subscribe((value: boolean) => {
      if (value) {
        this.groupConfig = this.groupConfigTemplate;
      } else {
        this.groupConfig = undefined;
      }
    });

    //Categoria filter
    this.categoriaControl = new FormControl();
    this.categoriaControlSubscription = this.categoriaControl.valueChanges.subscribe((categoria: Categoria) => {
      if (categoria) {
        this.where.categoria = { id: categoria.id };
      } else {
        delete this.where.categoria;
      }
      this.where = { ...this.where };
    });

    // De alta filter
    this.deAltaControl = new FormControl<boolean>(true);
    this.deAltaControlSubscription = this.deAltaControl.valueChanges.subscribe(deAlta => {
      if (deAlta) {
        this.where.de_alta = true;
      } else {
        delete this.where.de_alta;
      }
      this.where = { ...this.where };
    });

    /*
    this.rowClass = (articulo: Articulo) => {
      console.log('CHECKING', articulo);
      return {
        baja: true
      }
    }
     */

  }

  ngOnDestroy() {
    this.groupSubscription.unsubscribe();
    this.categoriaControlSubscription.unsubscribe();
    this.deAltaControlSubscription.unsubscribe();
  }
}
