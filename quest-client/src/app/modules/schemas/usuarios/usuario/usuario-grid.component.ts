import { Component, OnInit } from '@angular/core';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Usuario } from '../../../../models/usuarios/usuario';
import { UsuarioModelConfig } from '../../../../model-configs/usuarios/usuario-model-config';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { AocRestOptions } from '@atlantis-of-code/aoc-client/aoc-common';
import { Grupo } from '../../../../models/usuarios/grupo';
import { aocUiTplRef } from '@atlantis-of-code/aoc-client/ui/common/types';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-usuario-grid',
  imports: [
    CommonModule,
    AocGridModule
  ],
  template: `
    <aoc-grid [modelConfig]="modelConfig" [columns]="columns" [restOptions]="restOptions">
      <ng-template aocGridCell="boolean" let-value="value">
        <span *ngIf="value" class="material-symbols-rounded">check</span>
      </ng-template>
    </aoc-grid>
  `
})
export default class UsuarioGridComponent implements OnInit {
  protected columns: AocGridColumn<Usuario>[];

  protected restOptions: AocRestOptions<Usuario> = {
    fields: [ 'nombre', 'nombre_completo', 'mail', 'tecnico', 'repartidor' ],
    populate: {
      tecnico: true,
      repartidor: true,
      grupoCollection: true
    }
  }

  constructor(
    protected modelConfig: UsuarioModelConfig,
    private aocUiWindowDynRef: AocUiWindowDynRef
  ) {}

  ngOnInit() {
    this.columns = [
      {
        header: 'Téc.',
        headerTooltip: 'Asociado a perfil de técnico',
        display: [ Usuario.entity.TECNICO, aocUiTplRef('boolean') ],
        align: 'center',
        size: '5rem'
      },
      {
        header: 'Rep.',
        headerTooltip: 'Asociado a perfil de repartidor',
        display: [ Usuario.entity.REPARTIDOR, aocUiTplRef('boolean')],
        align: 'center',
        size: '5rem'
      },
      {
        header: 'Nombre de acceso',
        display: Usuario.field.NOMBRE,
        defaultSort: 'asc',
        size: '15rem'
      },
      {
        header: 'Nombre completo',
        display: Usuario.field.NOMBRE_COMPLETO
      },
      {
        header: 'Correo electrónico',
        display: Usuario.field.MAIL
      },
      {
        header: 'Grupos',
        display: [Usuario.collection.GRUPO, (grupos: Grupo[]) => grupos.map(g => g.nombre).join(', ')]
      }
    ];
    this.aocUiWindowDynRef.header('Panel de usuarios de la aplicación');
    this.aocUiWindowDynRef.show();
  }
}
