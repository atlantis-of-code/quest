import { Component, OnInit } from '@angular/core';
import { SectorModelConfig } from '../../../../model-configs/common/sector-model-config';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Sector } from '../../../../models/common/sector';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { SubsectorGridFieldComponent } from '../subsector/subsector-grid-field.component';

@Component({
  selector: 'app-sector-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [restOptions]="restOptions"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="SectorClass.field.NOMBRE">
          </aoc-ui-form-row>
          <aoc-ui-form-row aocUiFormRowHeight="stretch">
            <app-subsector-grid-field aocUiFormField="Subsectores"
                                      [formControlName]="SectorClass.collection.SUBSECTOR"></app-subsector-grid-field>
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule,
    SubsectorGridFieldComponent
  ],
  providers: [AocFormController]
})
export default class SectorFormComponent implements OnInit {
  SectorClass = Sector;

  restOptions: AocRestOptions<Sector> = {
    populate: {
      subsectorCollection: true
    }
  };

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: SectorModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Sector.field.NOMBRE]: [null, Validators.required],
      [Sector.collection.SUBSECTOR]: [[]]
    });
  }
}
