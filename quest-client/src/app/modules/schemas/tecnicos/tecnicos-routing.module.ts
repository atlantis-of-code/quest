import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';

const routes: Routes = [
  {
    path: 'tecnico/panel',
    loadComponent: () => import('./tecnico/tecnico-grid.component'),
    data: {
      title: of('Panel de técnicos'),
      closable: true,
      icon: 'handyman'
    } as AocTabConfig
  },
  {
    path: 'vehiculo/panel',
    loadComponent: () => import('./vehiculo/vehiculo-grid.component'),
    data: {
      title: of('Panel de vehículos'),
      closable: true
    } as AocTabConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class TecnicosRoutingModule {}
