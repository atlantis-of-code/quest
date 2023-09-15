import { Component, OnInit } from '@angular/core';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Grupo } from '../../../../models/usuarios/grupo';
import { GrupoModelConfig } from '../../../../model-configs/usuarios/grupo-model-config';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiToolbarModule } from '@atlantis-of-code/aoc-client/ui/panel/aoc-ui-toolbar';
import { GrupoSelectComponent } from './grupo-select.component';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AocUiInputGroupModule } from '@atlantis-of-code/aoc-client/ui/form/aoc-ui-input-group';
import { AocUiButtonModule } from '@atlantis-of-code/aoc-client/ui/button/aoc-ui-button';
import { AocUiToastMessageService } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-toast';
import { AocUiItemModule } from '@atlantis-of-code/aoc-client/ui/common/components/aoc-ui-item';

@Component({
  standalone: true,
  selector: 'app-grupo-grid-field',
  imports: [
    AocGridModule,
    AocUiToolbarModule,
    GrupoSelectComponent,
    ReactiveFormsModule,
    AocUiInputGroupModule,
    AocUiButtonModule,
    AocUiItemModule
  ],
  template: `
    <aoc-grid-field [modelConfig]="modelConfig" [columns]="columns">
      <ng-template aocUiToolbar="left">
        <aoc-ui-item>
          <aoc-ui-input-group>
            <app-grupo-select style="width: 30rem " [formControl]="grupoControl"></app-grupo-select>
            <button aocUiButton label="Asignar grupo al usuario" icon="arrow_downward" (click)="asignarGrupo()"></button>
          </aoc-ui-input-group>
        </aoc-ui-item>
      </ng-template>
    </aoc-grid-field>
  `
})
export class GrupoGridFieldComponent implements OnInit {
  protected columns: AocGridColumn<Grupo>[];

  protected grupoControl = new FormControl<Grupo>(null);

  constructor(
    protected modelConfig: GrupoModelConfig,
    private ngControl: NgControl,
    private aocUiToastMessageService: AocUiToastMessageService
  ) {}

  ngOnInit() {
    this.modelConfig = this.modelConfig.cloneWith({allow: ['delete']});
    this.columns = [
      {
        header: 'Nombre del grupo',
        display: Grupo.field.NOMBRE,
        defaultSort: 'asc'
      }
    ];
  }

  protected asignarGrupo() {
    const grupo = this.grupoControl.value;
    const current: Grupo[] = this.ngControl.control.value;
    for (const grupoExistente of current) {
      if (grupo.id === grupoExistente.id) {
        this.aocUiToastMessageService.showWarning('El usuario ya está en este grupo');
        return;
      }
    }
    current.push(grupo);
    this.ngControl.control.setValue(current);
  }
}
