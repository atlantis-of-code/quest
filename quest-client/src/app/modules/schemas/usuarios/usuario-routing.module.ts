import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';

const routes: Routes = [
  {
    path: 'usuario/panel',
    loadComponent: () => import('./usuario/usuario-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 960,
      height: 600
    } as AocUiWindowDynConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class UsuarioRoutingModule {}
