import { Component, OnDestroy, OnInit } from '@angular/core';
import { TecnicoModelConfig } from '../../../../model-configs/tecnicos/tecnico-model-config';
import { AbstractControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Tecnico } from '../../../../models/tecnicos/tecnico';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { Factura } from '../../../../models/facturacion/factura';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import {
  EmbDatosFiscalesFormAsFieldComponent
} from '../../abstract/emb-datos-fiscales/emb-datos-fiscales-form-as-field.component';
import {
  EmbInfoContactoFormAsFieldComponent
} from '../../abstract/emb-info-contacto/emb-info-contacto-form-as-field.component';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';

@Component({
  selector: 'app-tecnico-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
      [restOptions]="restOptions"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <app-emb-datos-fiscales-form-as-field></app-emb-datos-fiscales-form-as-field>
          <app-emb-info-contacto-form-as-field></app-emb-info-contacto-form-as-field>
          <aoc-ui-form-row>
            <input aocUiInputText [aocUiFormField]="serieEnFacturasLabel"
                   [formControlName]="TecnicoClass.field.SERIE_EN_FACTURAS">
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-fichero-grid-field
              aocUiFormField="Ficheros"
              [claseReferencia]="TecnicoClass"
              directorio="técnicos"
              [formControlName]="TecnicoClass.collection.FICHERO"
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
    EmbDatosFiscalesFormAsFieldComponent,
    EmbInfoContactoFormAsFieldComponent,
    FicheroGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class TecnicoFormComponent implements OnInit, OnDestroy {
  protected TecnicoClass = Tecnico;

  protected formGroup: UntypedFormGroup;

  protected restOptions: AocRestOptions<Tecnico> = {
    populate: {
      ficheroCollection: true
    }
  };

  protected serieEnFacturasLabel = 'Serie en facturas';

  private unsubscriber = new Subject<void>();

  constructor(
    public modelConfig: TecnicoModelConfig,
    private fb: UntypedFormBuilder,
    private mavermaUtils: MavermaUtilsService,
    private formController: AocFormController<Tecnico>,
    private restService: AocRestService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Tecnico.field.SERIE_EN_FACTURAS]: [null, Validators.required],
      [Tecnico.collection.FICHERO]: [[]]
    });
    this.mavermaUtils.addEmbDatosFiscalesControls(true, this.formGroup);
    this.mavermaUtils.addEmbInfoContactoControls(this.formGroup);
    this.handleFormController().then();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  async handleFormController() {
    const tecnico = await this.formController.model();
    this.formGroup.controls[Tecnico.field.SERIE_EN_FACTURAS].addAsyncValidators(async (control: AbstractControl) => {
      const otroTecnico = await this.restService.findOne(Tecnico, {
        id: { $ne: tecnico.id ?? '-1' },
        serie_en_facturas: control.value
      });
      if (otroTecnico) {
        return { [`Otro técnico (${this.modelConfig.transform(otroTecnico)}), ya tiene asignada esta serie de facturación, elija otra`]: true };
      }
      return null;
    });
    if (tecnico.id) {
      const facturaCount = await this.restService.count(
        Factura,
        { tecnico: { id: tecnico.id } }
      );
      console.log(facturaCount);
      if (facturaCount > 0) {
        console.log('IN!');
        const plural = facturaCount === 1 ? '' : 's';
        this.serieEnFacturasLabel = `Serie en facturas (no se puede modificar ya que tiene ${facturaCount} factura${plural} asociada${plural})`;
        this.formGroup.controls[Tecnico.field.SERIE_EN_FACTURAS].disable();
        this.formGroup.controls[Tecnico.field.SERIE_EN_FACTURAS].updateValueAndValidity();
      }
    } else {
      merge(
        this.formGroup.controls[Tecnico.field.NOMBRE_FISCAL].valueChanges,
        this.formGroup.controls[Tecnico.field.APELLIDO_1].valueChanges,
        this.formGroup.controls[Tecnico.field.APELLIDO_2].valueChanges
      ).pipe(takeUntil(this.unsubscriber)).subscribe(_ => {
        const nombre = this.formGroup.controls[Tecnico.field.NOMBRE_FISCAL].value ?? '';
        const primerApellido = this.formGroup.controls[Tecnico.field.APELLIDO_1].value ?? '';
        const segundoApellido = this.formGroup.controls[Tecnico.field.APELLIDO_2].value ?? '';
        const serie = `${nombre ? nombre[0].toUpperCase() : ''}${primerApellido ? primerApellido[0].toUpperCase() : ''}${segundoApellido ? segundoApellido[0].toUpperCase() : ''}`;
        this.formGroup.controls[Tecnico.field.SERIE_EN_FACTURAS].setValue(serie);
      });
    }
  }
}
