import {RouterModule, Routes} from '@angular/router';
import {AocTabConfig} from '@atlantis-of-code/aoc-client/core/configs';
import {of} from 'rxjs';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      {
        path: 'panel',
        loadComponent: () => import('./customer/customer-grid.component'),
        data: {
          title: of('Customers'),
          icon: 'groups'
        } as AocTabConfig
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class CustomersModule {}
