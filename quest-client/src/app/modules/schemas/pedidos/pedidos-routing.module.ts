import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';

const routes: Routes = [
  {
    path: 'pedido/panel',
    loadComponent: () => import('./pedido/pedido-grid.component'),
    data: {
      title: of('Pedidos'),
      closable: true
    } as AocTabConfig
  },
  {
    path: 'ruta/panel',
    loadComponent: () => import('./ruta/ruta-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 320,
      height: 480
    } as AocUiWindowDynConfig
  },
  {
    path: 'repartidor/panel',
    loadComponent: () => import('./repartidor/repartidor-grid.component'),
    data: {
      title: of('Repartidores'),
      closable: true
    } as AocTabConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class PedidosRoutingModule {}
