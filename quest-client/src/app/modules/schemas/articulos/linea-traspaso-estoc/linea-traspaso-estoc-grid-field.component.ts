import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { FormControl, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo } from '../../../../models/articulos/articulo';
import { firstValueFrom, Subject } from 'rxjs';
import { AocUiWindowDynRef, AocUiWindowDynService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { LineaTraspasoEstocCantidadFormComponent } from './linea-traspaso-estoc-cantidad-form.component';
import { AocUiShareService } from '@atlantis-of-code/aoc-client/ui/common/services';
import { ArticuloModelConfig } from '../../../../model-configs/articulos/articulo-model-config';
import { takeUntil } from 'rxjs/operators';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import {
  LineaTraspasoEstocModelConfig
} from '../../../../model-configs/articulos/linea-traspaso-estoc-model-config';
import { LineaTraspasoEstoc } from '../../../../models/articulos/linea-traspaso-estoc';
import { AocUiValidators } from '@atlantis-of-code/aoc-client/ui/common/validators';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { ArticuloSelectComponent } from '../articulo/articulo-select.component';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-traspaso-estoc-movimiento-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    AocUiToolbarModule,
    ReactiveFormsModule,
    ArticuloSelectComponent,
    AocUiInputTextModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <app-articulo-select
            placeholder="Selecciona un artículo para traspasar..."
            style="width: 40rem"
            allow="none"
            [formControl]="articuloFormControl"
            #focusTarget
          ></app-articulo-select>
        </aoc-ui-item>
      </ng-template>
      <ng-template aocGridCell="cantidad" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>
    </aoc-grid-field>
  `
})
export class LineaTraspasoEstocGridFieldComponent implements OnInit, OnDestroy {
  protected columns: AocGridColumn<LineaTraspasoEstoc>[];

  protected articuloFormControl: FormControl<Articulo>;

  @ViewChild('focusTarget', {static: false, read: ElementRef}) private focusTarget;

  private globalUnsubscriber = new Subject<void>();

  constructor(
    public modelConfig: LineaTraspasoEstocModelConfig,
    private articuloModelConfig: ArticuloModelConfig,
    private ngControl: NgControl,
    private windowDynService: AocUiWindowDynService,
    private shareService: AocUiShareService,
    private windowDynRef: AocUiWindowDynRef,
    private toastMessageService: AocUiToastMessageService
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        header: 'Artículo',
        display: [LineaTraspasoEstoc.entity.ARTICULO, this.articuloModelConfig.transform],
        defaultSort: 'asc',
        orderBy: {
          articulo: {
            codigo: 'auto',
            nombre: 'auto'
          }
        }
      },
      {
        header: 'Cant.',
        display: [ LineaTraspasoEstoc.field.CANTIDAD ],
        align: 'right',
        editable: [aocUiTplRef('cantidad'), new FormControl<string>(null, [Validators.required, AocUiValidators.strictlyPositiveNumber()])],
        size: '6rem'
      }
    ];
    this.articuloFormControl = new FormControl<Articulo>(null);
    this.articuloFormControl.valueChanges.pipe(takeUntil(this.globalUnsubscriber)).subscribe(articulo => {
      if (articulo) {
        this.procesarArticulo(articulo).then(_ => {
          this.articuloFormControl.setValue(null);
          this.focusTarget.nativeElement.querySelector('.aoc-ui-autocomplete-input').focus();
        });
      }
    });
  }

  private async procesarArticulo(articulo: Articulo) {
    const current: LineaTraspasoEstoc[] = this.ngControl.control.value;
    if (current.some(lte => lte.articulo.id === articulo.id)) {
      this.toastMessageService.showWarning('El artículo ya está en la lista');
      return;
    }
    const shareId = this.shareService.register({articulo});
    this.windowDynService.open(LineaTraspasoEstocCantidadFormComponent, {
      header: 'Selecciona la cantidad',
      height: 480,
      width: 320,
      parentWindowNumber: this.windowDynRef.windowNumber,
      closable: false,
      aocUiShareId: shareId
    })
    const response: string = await firstValueFrom(this.shareService.getResponseObservable(shareId));
    if (response !== 'cancelar') {
      const lineaTraspasoEstoc = new LineaTraspasoEstoc();
      lineaTraspasoEstoc.articulo = articulo;
      lineaTraspasoEstoc.cantidad = response;
      current.push(lineaTraspasoEstoc);
      this.ngControl.control.setValue(current);
    }
  }

  ngOnDestroy() {
    this.globalUnsubscriber.next();
    this.globalUnsubscriber.unsubscribe();
  }
}
