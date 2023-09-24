import { Component, OnInit } from '@angular/core';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { RepartidorModelConfig } from '../../../../model-configs/pedidos/repartidor-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { QuestUtilsService } from '../../../../services/quest-utils.service';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Repartidor } from '../../../../models/pedidos/repartidor';
import {
  EmbDatosFiscalesFormAsFieldComponent
} from '../../abstract/emb-datos-fiscales/emb-datos-fiscales-form-as-field.component';
import {
  EmbInfoContactoFormAsFieldComponent
} from '../../abstract/emb-info-contacto/emb-info-contacto-form-as-field.component';
import { FicheroGridFieldComponent } from '../../ficheros/fichero-grid-field.component';

@Component({
  standalone: true,
  selector: 'app-repartidor-form',
  providers: [AocFormController],
  imports: [
    AocFormModule,
    AocUiFormModule,
    EmbDatosFiscalesFormAsFieldComponent,
    ReactiveFormsModule,
    EmbInfoContactoFormAsFieldComponent,
    FicheroGridFieldComponent
  ],
  template: `
    <aoc-form [modelConfig]="modelConfig" [formGroup]="formGroup" [restOptions]="restOptions">
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <app-emb-datos-fiscales-form-as-field></app-emb-datos-fiscales-form-as-field>
          <app-emb-info-contacto-form-as-field></app-emb-info-contacto-form-as-field>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-fichero-grid-field
              aocUiFormField="Ficheros"
              [claseReferencia]="RepartidorClass"
              directorio="repartidores"
              [formControlName]="RepartidorClass.collection.FICHERO"
            ></app-fichero-grid-field>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `
})
export default class RepartidorFormComponent implements OnInit {
  protected RepartidorClass = Repartidor;
  protected formGroup: UntypedFormGroup;
  protected restOptions: AocRestOptions<Repartidor> = {
    populate: {
      tipoDocumento: true,
      ficheroCollection: true
    }
  };
  constructor(
    protected modelConfig: RepartidorModelConfig,
    private fb: UntypedFormBuilder,
    private mavermaUtils: QuestUtilsService
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      [Repartidor.collection.FICHERO]: [[]]
    });
    this.mavermaUtils.addEmbDatosFiscalesControls(true, this.formGroup);
    this.mavermaUtils.addEmbInfoContactoControls(this.formGroup);
  }
}
