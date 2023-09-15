import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';

const routes: Routes = [
  {
    path: 'almacen-gas/panel',
    loadComponent: () => import('./almacen-gas/almacen-gas-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 480,
      height: 320
    } as AocUiWindowDynConfig
  },
  {
    path: 'empresa/form',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./empresa/empresa-form.component'),
    data: {
      width: 960,
      height: 580
    } as AocUiWindowDynConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class ConfiguracionRoutingModule {}
