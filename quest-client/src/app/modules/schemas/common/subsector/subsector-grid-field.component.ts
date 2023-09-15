import { Component, OnInit } from '@angular/core';
import { SubsectorModelConfig } from '../../../../model-configs/common/subsector-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Subsector } from '../../../../models/common/subsector';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { AocUiInputTextModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-text';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';

@Component({
  selector: 'app-subsector-grid-field',
  standalone: true,
  imports: [
    AocGridModule,
    AocUiItemModule,
    ReactiveFormsModule,
    AocUiToolbarModule,
    AocUiInputTextModule,
    AocUiButtonModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
    >
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <input aocUiInputText placeholder="Nuevo subsector" #nombreSubsectorInput>
        </aoc-ui-item>
        <aoc-ui-item>
          <button aocUiButton label="Añadir sub."
                  (click)="add(nombreSubsectorInput.value); nombreSubsectorInput.value = null; nombreSubsectorInput.focus()"></button>
        </aoc-ui-item>
      </ng-template>
      <ng-template [aocGridCell]="SubsectorClass.field.NOMBRE" let-formControl="formControl">
        <input aocUiInputText [formControl]="formControl">
      </ng-template>

    </aoc-grid-field>
  `
})
export class SubsectorGridFieldComponent implements OnInit {
  SubsectorClass = Subsector;

  columns: AocGridColumn[];

  constructor(
    public modelConfig: SubsectorModelConfig,
    private ngControl: NgControl
  ) { }

  ngOnInit(): void {
    this.modelConfig = this.modelConfig.cloneWith({allow: ['delete']});

    this.columns = [
      {header: 'Nombre', display: Subsector.field.NOMBRE, editable: true, defaultSort: 'asc'}
    ]
  }

  add(nombreSubsector: string) {
    if (!nombreSubsector) {
      return;
    }
    const nuevoSubsector = new Subsector();
    nuevoSubsector.nombre = nombreSubsector;
    const subsectoresActuales: Subsector[] = this.ngControl.control.value;
    subsectoresActuales.push(nuevoSubsector);
    this.ngControl.control.setValue(subsectoresActuales);
  }
}
