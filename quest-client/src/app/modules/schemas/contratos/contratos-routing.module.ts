import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';

const routes: Routes = [
  {
    path: 'contrato/panel',
    loadComponent: () => import('./contrato/contrato-panel.component'),
    data: {
      title: of('Panel de contratos'),
      closable: true
    } as AocTabConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class ContratosRoutingModule {}
