import { Component, OnInit } from '@angular/core';
import { CategoriaModelConfig } from '../../../../model-configs/articulos/categoria-model-config';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../models/articulos/categoria';
import { AocFormController, AocFormModule } from '@atlantis-of-code/aoc-client/components/aoc-form';
import { AocUiFormModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-form';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  template: `
    <aoc-form
      [modelConfig]="modelConfig"
      [formGroup]="formGroup"
    >
      <ng-template aocFormTemplate="body">
        <aoc-ui-form-page>
          <aoc-ui-form-row>
            <input aocUiInputText aocUiFormField="Nombre" [formControlName]="CategoriaClass.field.NOMBRE">
          </aoc-ui-form-row>
        </aoc-ui-form-page>
      </ng-template>
    </aoc-form>
  `,
  imports: [
    AocFormModule,
    ReactiveFormsModule,
    AocUiFormModule,
    AocUiInputTextModule
  ],
  providers: [AocFormController]
})
export default class CategoriaFormComponent implements OnInit {
  CategoriaClass = Categoria;

  formGroup: UntypedFormGroup;

  constructor(
    public modelConfig: CategoriaModelConfig,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [Categoria.field.NOMBRE]: [null, Validators.required]
    });
  }
}
