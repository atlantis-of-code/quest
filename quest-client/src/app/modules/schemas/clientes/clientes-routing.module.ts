import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';


const routes: Routes = [
  {
    path: 'cliente/panel',
    loadComponent: () => import('./cliente/cliente-panel.component'),
    data: {
      title: of('Panel de clientes'),
      closable: true,
      icon: 'groups'
    } as AocTabConfig
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class ClientesRoutingModule {}
