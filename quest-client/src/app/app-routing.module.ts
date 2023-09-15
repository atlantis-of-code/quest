import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AocLoginComponent } from '@atlantis-of-code/aoc-client/components/aoc-login';
import { AocPdfViewerComponent } from '@atlantis-of-code/aoc-client/components/aoc-pdf-viewer';
import { AocAuthGuard, AocLoginGuard, AocWindowGuard } from '@atlantis-of-code/aoc-client/core/guards';
import { of } from 'rxjs';
import { AocTabConfig } from '@atlantis-of-code/aoc-client/core/configs';
import { AocUiWindowDynConfig } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { NaceComponent } from './components/nace/nace.component';
import { PreloadServicesGuard } from './guards/preload-services.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AocLoginComponent,
    canActivate: [AocLoginGuard],
    data: {
      title: of('Login')
    } as AocTabConfig
  },
  {
    path: '',
    canActivate: [AocAuthGuard, PreloadServicesGuard],
    children: [
      // EMPTY COMPONENT: we don't need it because we want the dashboard to be always open
      // {
      //  path: '',
      //  component: AocEmptyComponent
      // },
      { // DASHBOARD
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component'),
        data: {
          title: of('Dashboard'),
          closable: false
        } as AocTabConfig
      },
      {
        path: 'clientes',
        loadChildren: () => import('./modules/schemas/clientes/clientes-routing.module')
      },
      {
        path: 'contratos',
        loadChildren: () => import('./modules/schemas/contratos/contratos-routing.module')
      },
      {
        path: 'common',
        loadChildren: () => import('./modules/schemas/common/common-routing.module')
      },
      {
        path: 'articulos',
        loadChildren: () => import('./modules/schemas/articulos/articulos-routing.module')
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./modules/schemas/configuracion/configuracion-routing.module')
      },{
        path: 'facturacion',
        loadChildren: () => import('./modules/schemas/facturacion/facturacion-routing.module')
      },
      {
        path: 'tecnicos',
        loadChildren: () => import('./modules/schemas/tecnicos/tecnicos-routing.module')
      },
      {
        path: 'pedidos',
        loadChildren: () => import('./modules/schemas/pedidos/pedidos-routing.module')
      },
      {
        path: 'abstract',
        loadChildren: () => import('./modules/schemas/abstract/abstract-routing.module')
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/schemas/usuarios/usuario-routing.module')
      },
      {
        path: 'nace',
        component: NaceComponent,
        data: {
          header: 'Instrucciones de Instalación y de Actualización del Conector Nace',
          width: 0.75,
          height: 0.75
        } as AocUiWindowDynConfig,
        canActivate: [AocWindowGuard]
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
