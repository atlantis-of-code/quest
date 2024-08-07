import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';

const routes: Routes = [
  {
    path: 'category/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./category/category-grid.component')
  },
  {
    path: 'item/panel',
    loadComponent: () => import('./item/item-grid.component')
  },
  {
    path: 'stock-count/panel',
    loadComponent: () => import('./stock-count/stock-count-panel.component')
  },
  {
    path: 'store/panel',
    canActivate: [ AocWindowGuard ],
    loadComponent: () => import('./store/store-grid.component')
  },
  {
    path: 'store-transfer/panel',
    loadComponent: () => import('./store-transfer/store-transfer-grid.component')
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class ItemsModule {}
