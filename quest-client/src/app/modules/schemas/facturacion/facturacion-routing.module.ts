import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';

const routes: Routes = [
  {
    path: 'presupuesto/panel',
    loadComponent: () => import('./presupuesto/presupuesto-panel.component'),
    data: {
      title: of('Presupuestos'),
      closable: true
    } as AocTabConfig
  },
  {
    path: 'albaran/panel',
    loadComponent: () => import('./albaran/albaran-panel.component'),
    data: {
      title: of('Albaranes'),
      closable: true
    } as AocTabConfig
  },
  {
    path: 'factura/panel',
    loadComponent: () => import('./factura/factura-panel.component'),
    data: {
      title: of('Facturas'),
      closable: true
    } as AocTabConfig
  },
  {
    path: 'ticket/panel',
    loadComponent: () => import('./ticket/ticket-grid.component'),
    data: {
      closable: true,
      title: of('Tickets')
    } as AocTabConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class FacturacionRoutingModule {}
