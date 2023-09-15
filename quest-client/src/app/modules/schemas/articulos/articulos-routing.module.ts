import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';

const routes: Routes = [
  {
    path: 'bombona/panel',
    loadComponent: () => import('./bombona/bombona-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 480,
      height: 480
    } as AocUiWindowDynConfig
  },
  {
    path: 'categoria/panel',
    loadComponent: () => import('./categoria/categoria-grid.component'),
    canActivate: [ AocWindowGuard ],
    data: {
      width: 320,
      height: 640,
      header: 'Categorías'
    } as AocUiWindowDynConfig
  },
  {
    path: 'articulo/panel',
    loadComponent: () => import('./articulo/articulo-panel.component'),
    data: {
      title: of('Panel de artículos'),
      closable: true
    } as AocTabConfig
  },
  {
    path: 'articulo/foto',
    loadComponent: () => import('./articulo/articulo-foto-grid.component'),
    data: {
      title: of('Fotos de articulos'),
      closable: true,
      icon: 'camera'
    } as AocTabConfig
  },
  {
    path: 'almacen/panel',
    loadComponent: () => import('./almacen/almacen-panel.component'),
    data: {
      title: of('Almacenes de artículos'),
      closable: true
    } as AocTabConfig
  },
  {
    path: 'movimiento-estoc/panel',
    loadComponent: () => import('./movimiento-estoc/movimiento-estoc-grid.component').then(c => c.MovimientoEstocGridComponent), // Intentional, used as standalone component in recuento-estoc
    data: {
      closable: true,
      title: of('Movimientos de estoc')
    } as AocTabConfig
  },
  {
    path: 'recuento-estoc/panel',
    loadComponent: () => import('./recuento-estoc/recuento-estoc-panel.component'),
    data: {
      closable: true,
      title: of('Recuentos de estoc')
    } as AocTabConfig
  },
  {
    path: 'traspaso-estoc/panel',
    loadComponent: () => import('./traspaso-estoc/traspaso-estoc-grid.component'),
    data: {
      title: of('Traspasos entre almacenes'),
      closable: true
    } as AocTabConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class ArticulosRoutingModule {}
