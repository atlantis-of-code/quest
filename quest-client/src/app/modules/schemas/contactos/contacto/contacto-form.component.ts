import { Component, OnInit } from '@angular/core';
import { ContactoModelConfig } from '../../../../model-configs/contactos/contacto-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Contacto } from '../../../../models/contactos/contacto';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { MavermaUtilsService } from '../../../../services/maverma-utils.service';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import {
  EmbInfoContactoFormAsFieldComponent
} from '../../abstract/emb-info-contacto/emb-info-contacto-form-as-field.component';

@Component({
  selector: 'app-contacto-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="ContactoClass.field.NOMBRE">
          </aoc-ui-form-row>
          <!-- Inline info contacto -->
          <app-emb-info-contacto-form-as-field></app-emb-info-contacto-form-as-field>
        </aoc-ui-form-page>

      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    AocUiFormModule,
    AocUiInputTextModule,
    EmbInfoContactoFormAsFieldComponent,
    ReactiveFormsModule
  ],
  providers: [AocFormController]
})
export default class ContactoFormComponent implements OnInit {
  ContactoClass = Contacto;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: ContactoModelConfig,
    private mavermaUtils: MavermaUtilsService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Contacto.field.NOMBRE]: [null, Validators.required]
    });
    this.mavermaUtils.addEmbInfoContactoControls(this.formGroup);
  }
}
