import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';

const routes: Routes = [
  {
    path: 'denominacion-via/panel',
    loadComponent: () => import('./denominacion-via/denominacion-via-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 320,
      height: 480
    } as AocUiWindowDynConfig
  },
  {
    path: 'pais/panel',
    loadComponent: () => import('./pais/pais-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 320,
      height: 480
    } as AocUiWindowDynConfig
  },
  {
    path: 'tipo-documento/panel',
    loadComponent: () => import('./tipo-documento/tipo-documento-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 480,
      height: 480
    } as AocUiWindowDynConfig
  },
  {
    path: 'sector/panel',
    loadComponent: () => import('./sector/sector-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 480,
      height: 640
    } as AocUiWindowDynConfig
  },
  {
    path: 'anyo-fiscal/panel',
    loadComponent: () => import('./anyo-fiscal/anyo-fiscal-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 320,
      height: 480,
      header: 'Años fiscales'
    } as AocUiWindowDynConfig
  },
  {
    path: 'modo-de-pago/panel',
    loadComponent: () => import('./modo-de-pago/modo-de-pago-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 480,
      height: 640
    } as AocUiWindowDynConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class CommonRoutingModule {}
