import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AocLoginComponent } from '@atlantis-of-code/aoc-client/components/aoc-login';
import { AocPdfViewerComponent } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocAuthGuard, AocLoginGuard, AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { of } from 'rxjs';
import { questDefaultsGuard } from './services/quest-defaults-service';

const routes: Routes = [
  {
    path: 'login',
    component: AocLoginComponent,
    canActivate: [AocLoginGuard],
    data: {
      title: of('Login')
    } as AocTabConfig
  },
  //TODO: Path of First time company configuration, if still no company, wizard
  {
    path: '',
    canActivate: [AocAuthGuard, questDefaultsGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard.component'),
        data: {
          title: of('Dashboard'),
          closable: false
        } as AocTabConfig
      },
      {
        path: 'customers',
        loadChildren: () => import('./features/schemas/customers/customers.module')
      },
      {
        path: 'print_pdf_window',
        component: AocPdfViewerComponent,
        data: {
          width: 0.5,
          height: 0.75
        } as AocUiWindowDynConfig,
        canActivate: [AocWindowGuard]
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
