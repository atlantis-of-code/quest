import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AocModelConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocGridColumn, AocGridFieldModelEvent, AocGridGroupConfig } from '@atlantis-of-code/aoc-client/core/types';
import { EmbLineaDocumento } from '../../../../models/abstract/emb-linea-documento';
import { FormControl, NgControl, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { Articulo } from '../../../../models/articulos/articulo';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrecioPipe } from '../../../../pipes/precio.pipe';
import { PorcentajePipe } from '../../../../pipes/porcentaje.pipe';
import { Big } from 'big.js';
import { Categoria } from '../../../../models/articulos/categoria';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { Almacen } from '../../../../models/articulos/almacen';
import { Tecnico } from '../../../../models/tecnicos/tecnico';
import { MavermaDefaultsService } from '../../../../services/maverma-defaults.service';
import { Vehiculo } from '../../../../models/tecnicos/vehiculo';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import {
  AocUiVerticalSeparatorModule
} from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-vertical-separator';
import { AocUiInputCheckboxModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-checkbox';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AocUiTooltipModule } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-tooltip';
import { AlmacenSelectComponent } from '../../articulos/almacen/almacen-select.component';
import { ArticuloSelectComponent } from '../../articulos/articulo/articulo-select.component';

@Component({
  selector: 'app-emb-linea-documento-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    AocUiItemModule,
    ArticuloSelectComponent,
    AocUiVerticalSeparatorModule,
    ReactiveFormsModule,
    AlmacenSelectComponent,
    AocUiInputCheckboxModule,
    AocUiButtonModule,
    AocUiInputTextModule,
    NgIf,
    RouterLink,
    AocUiTooltipModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
      [sortField]="sortField"
      [sortDir]="sortDir"
      [groupConfig]="categoriaGroupConfig"
      (modelChange)="onModelChange($event)"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <app-articulo-select [allow]="['add']" [formControl]="nuevoArticuloControl" style="width: 35rem" #focusTarget
                               placeholder="Añadir artículo..."></app-articulo-select>
        </aoc-ui-item>
        <ng-container *ngIf="gestionarAlmacen">
          <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
          <aoc-ui-item>
            Almacén
          </aoc-ui-item>
          <aoc-ui-item>
            <app-almacen-select allow="none" [formControl]="almacenFormControl"
                                style="width: 20rem"></app-almacen-select>
          </aoc-ui-item>
        </ng-container>
      </ng-template>

      <ng-template aocUiToolbar="right">
        <aoc-ui-item>
          <input type="checkbox" aocUiInputCheckbox="Agrupar por cat." [formControl]="agruparPorCategoriaControl">
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          <button aocUiButton icon="add_circle" label="Añadir línea vacía" (click)="agregarLineaVacia()"></button>
        </aoc-ui-item>
        <aoc-ui-vertical-separator></aoc-ui-vertical-separator>
        <aoc-ui-item>
          Descuento global:
        </aoc-ui-item>
        <aoc-ui-item>
          <input aocUiInputText [max]="100" [min]="0" #dg (keyup.enter)="aplicarDescuentoGlobal(dg.value)"
                 style="width: 5rem">
        </aoc-ui-item>
      </ng-template>

      <ng-template aocGridCell="almacen-display" let-almacen="value" let-model="model">
        <span *ngIf="model.articulo">{{ almacen.nombre }}</span>
        <div *ngIf="!model.articulo" style="background-color: lightgray; width: 100%; height: 100%"></div>
      </ng-template>

      <ng-template aocGridCell="texto" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>

      <ng-template aocGridCell="decimal" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>

      <ng-template aocGridCell="porcentaje" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>

      <ng-template aocGridCell="almacen-edit" let-formControl="formControl" let-model="model">
        <app-almacen-select allow="none" [formControl]="formControl"></app-almacen-select>
      </ng-template>

      <ng-template aocGridCell="articulo" let-articulo="value">
        <i *ngIf="articulo" class="package" aocUiTooltip="Línea asociada a un artículo, haga click para ver el artículo"
           [routerLink]="['articulos', 'articulo', 'form', {id: articulo.id, parentWindowNumber: aocUiWindowDynRef.windowNumber}]"></i>
      </ng-template>
    </aoc-grid-field>
  `
})
export class EmbLineaDocumentoGridFieldComponent implements OnInit, OnDestroy {
  @Input()
  modelConfig: AocModelConfig<any>;

  @Input()
  set tecnico(t: Tecnico) {
    this.gestionarCambioTecnico(t).then();
  };

  @Input()
  gestionarAlmacen = true;

  almacenFormControl = new FormControl<Almacen>(null);

  columns: AocGridColumn<EmbLineaDocumento>[];

  sortField = EmbLineaDocumento.field.ORDEN;
  sortDir: 'asc' | 'desc' = 'asc';

  nuevoArticuloControl: UntypedFormControl;

  agruparPorCategoriaControl: UntypedFormControl;
  categoriaGroupConfig: AocGridGroupConfig<string>;

  unsubscriber = new Subject<void>();

  @ViewChild('focusTarget', {static: false, read: ElementRef}) focusTarget;

  constructor(
    public aocUiWindowDynRef: AocUiWindowDynRef,
    private ngControl: NgControl,
    private precioPipe: PrecioPipe,
    private porcentajePipe: PorcentajePipe,
    private aocFormWindowService: AocFormWindowService,
    private mavermaDefaultsService: MavermaDefaultsService,
    private aocRestService: AocRestService
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: '',
        display: [ EmbLineaDocumento.entity.ARTICULO, aocUiTplRef('articulo') ],
        size: '3rem',
        align: 'center'
      },
      {
        header: 'Código',
        display: EmbLineaDocumento.field.CODIGO_ARTICULO,
        size: '10rem',
        editable: [aocUiTplRef('texto'), new UntypedFormControl(null)]
      },
      {
        header: 'Nombre',
        display: EmbLineaDocumento.field.NOMBRE_ARTICULO,
        editable: [aocUiTplRef('texto'), new UntypedFormControl(null, Validators.required)]
      },
      {
        header: 'Precio',
        display: [EmbLineaDocumento.field.PRECIO_BASE, this.precioPipe],
        align: 'right',
        size: '10rem',
        formControlName: EmbLineaDocumento.field.PRECIO_BASE,
        editable: [aocUiTplRef('decimal'), new UntypedFormControl(null, [Validators.required, AocUiValidators.number(2)])]
      },
      {
        header: 'Cantidad',
        display: EmbLineaDocumento.field.CANTIDAD,
        align: 'right',
        size: '10rem',
        editable: [aocUiTplRef('decimal'), new UntypedFormControl(null, [Validators.required, AocUiValidators.number(2)])]
      },
      {
        header: 'Descuento',
        display: [EmbLineaDocumento.field.DESCUENTO, this.porcentajePipe],
        align: 'right',
        size: '10rem',
        formControlName: EmbLineaDocumento.field.DESCUENTO,
        editable: [aocUiTplRef('porcentaje'), new UntypedFormControl(null, [Validators.required, AocUiValidators.numberInInterval(0, 100)])]
      },
      {
        header: 'Sub.Base',
        display: [EmbLineaDocumento.field.TOTAL_BASE, this.precioPipe],
        align: 'right',
        size: '10rem'
      },
    ];

    if (this.gestionarAlmacen) {
      this.columns.splice(3, 0,
        {
          header: 'Almacén',
          display: [EmbLineaDocumento.entity.ALMACEN, aocUiTplRef('almacen-display')],
          editable: [
            (embLineaDocumento) => embLineaDocumento.articulo != null,
            aocUiTplRef('almacen-edit'),
            new UntypedFormControl(null, Validators.required)
          ]
        });
    }

    this.nuevoArticuloControl = new UntypedFormControl();
    this.nuevoArticuloControl.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((nuevoArticulo: Articulo) => {
      if (nuevoArticulo) {
        this.gestionarNuevoArticulo(nuevoArticulo).then(_ => this.nuevoArticuloControl.setValue(null));
      }
    });

    this.agruparPorCategoriaControl = new UntypedFormControl(false);
    this.agruparPorCategoriaControl.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((agruparPorCategoria) => {
      if (agruparPorCategoria) {
        this.categoriaGroupConfig = {
          display: [EmbLineaDocumento.entity.ARTICULO, Articulo.entity.CATEGORIA, Categoria.field.NOMBRE],
          compareFn: 'auto',
          noGroupRenderer: _ => 'Sin categoría asignada'
        }
      } else {
        this.categoriaGroupConfig = null;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  onModelChange(event: AocGridFieldModelEvent<any>) {
    if (event.type === 'update') {
      this.calculoTotalLinea(event.model);
      event.updateModel(event.model);
    }
  }

  aplicarDescuentoGlobal(descuento: string) {
    const current: EmbLineaDocumento[] = this.ngControl.control.value;
    for (const linea of current) {
      linea.descuento = descuento;
    }
    this.ngControl.control.setValue(current);
  }

  agregarLineaVacia() {
    const current: EmbLineaDocumento[] = this.ngControl.control.value;
    const linea = new this.modelConfig.modelClass();
    linea.orden = Math.max(...current.length > 0 ? current.map(l => l.orden) : [0]) + 1;
    linea.codigo_articulo = null;
    linea.nombre_articulo = null;
    linea.precio_base = '0.00';
    linea.cantidad = '1';
    linea.descuento = '0.00';
    linea.total_base = '0.00';
    current.push(linea);
    this.ngControl.control.setValue(current);
  }

  async gestionarNuevoArticulo(articulo: Articulo) {
    const current: EmbLineaDocumento[] = this.ngControl.control.value;
    const linea = new this.modelConfig.modelClass();
    linea.articulo = articulo;
    linea.orden = Math.max(...current.length > 0 ? current.map(l => l.orden) : [0]) + 1;
    linea.codigo_articulo = `${articulo.codigo}`;
    linea.nombre_articulo = articulo.nombre;
    linea.precio_base = articulo.precio_base;
    linea.cantidad = '1';
    linea.descuento = '0.00';
    linea.total_base = '0.00';
    linea.almacen = this.almacenFormControl.value;
    const response = await this.aocFormWindowService.openRoute<EmbLineaDocumento>({
      path: ['abstract', 'emb-linea-documento', 'form'],
      aocFormConfig: {
        modelOrId: linea,
        persistToDatabase: false,
        disableSafeClose: true
      },
      aocUiWindowDynConfig: {
        parentWindowNumber: this.aocUiWindowDynRef.windowNumber
      }
    });
    if (response.type === 'save') {
      const lineaModificada = response.model;
      this.calculoTotalLinea(lineaModificada);
      current.push(response.model);
      this.ngControl.control.setValue(current);
      // app-articulo-select
      this.focusTarget.nativeElement.querySelector('.aoc-ui-autocomplete-input').focus();
    }
  }

  private calculoTotalLinea(linea: EmbLineaDocumento) {
    const precioBase = Big(linea.precio_base ?? 0);
    const cantidad = Big(linea.cantidad ?? 0);
    const descuento = Big(linea.descuento ?? 0);
    const baseSinDescuento = precioBase.mul(cantidad);
    linea.total_base = baseSinDescuento.sub(baseSinDescuento.mul(descuento).div('100')).round(2, Big.roundHalfEven).toString();
  }

  private async gestionarCambioTecnico(tecnico: Tecnico) {
    if (!tecnico) {
      this.almacenFormControl.setValue(this.mavermaDefaultsService.almacen);
      console.log(this.almacenFormControl.value);
    } else {
      //TODO: Només vehícles d'alta
      const vehiculos = await this.aocRestService.find(
        Vehiculo,
        { tecnico: { id: tecnico.id }},
        { populate: { almacen: true } }
      );
      if (vehiculos.length === 1 && vehiculos[0].almacen) {
        this.almacenFormControl.setValue(vehiculos[0].almacen)
      } else if (vehiculos.length > 1) {
        // TODO: fer que surti una finestra per avisar de quin vehicle volem agafar es magatzem
      }
    }
  }
}
