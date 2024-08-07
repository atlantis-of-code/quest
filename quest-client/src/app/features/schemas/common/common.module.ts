import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';

const routes: Routes = [
  {
    path: 'country/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./country/country-grid.component')
  },
  {
    path: 'fiscal-year/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./fiscal-year/fiscal-year-grid.component')
  },
  {
    path: 'gender/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./gender/gender-grid.component')
  },
  {
    path: 'language/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./language/language-grid.component')
  },
  {
    path: 'series/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./series/series-grid.component')
  },
  {
    path: 'tax/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./tax/tax-grid.component')
  },
  {
    path: 'payment-system/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./payment-system/payment-system-grid.component')
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class CommonModule {}
