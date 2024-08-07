import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'budget/panel',
    loadComponent: () => import('./budget/budget-panel.component')
  },
  {
    path: 'delivery-note/panel',
    loadComponent: () => import('./delivery-note/delivery-note-panel.component'),
  },
  {
    path: 'invoice/panel',
    loadComponent: () => import('./invoice/invoice-panel.component')
  },
  {
    path: 'ticket/panel',
    loadComponent: () => import('./ticket/ticket-panel.component'),
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export default class InvoicingModule {}
