import { Component } from '@angular/core';
import { AocModelManager } from '@atlantis-of-code/aoc-client/core/models';
import { AocUiDataMenu } from '@atlantis-of-code/aoc-client/ui/common/types';
import { meta } from './models/meta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mainMenu: AocUiDataMenu = [
    {
      label: 'Customers',
      icon: 'groups',
      items: [
        {label: 'Customers panel', routerLink: ['customers', 'customer', 'panel']},
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Contratos y pedidos',
      icon: 'handshake',
      items: [
        { label: 'Panel de contratos', routerLink: ['contratos', 'contrato', 'panel']},
        { type: 'separator' },
        { label: 'Pedidos', routerLink: [ 'pedidos', 'pedido', 'panel' ]},
        { label: 'Repartidores', routerLink: [ 'pedidos', 'repartidor', 'panel' ]},
        { label: 'Rutas', routerLink: [ 'pedidos', 'ruta', 'panel' ]}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Artículos',
      icon: 'auto_awesome_mosaic',
      items: [
        { label: 'Artículos', routerLink: ['articulos', 'articulo', 'panel' ]},
        { label: 'Gestión de fotos', routerLink: ['articulos', 'articulo', 'foto' ]},
        { label: 'Categorías', routerLink: ['articulos', 'categoria', 'panel']},
        { type: 'separator' },
        { label: 'Bombonas', routerLink: ['articulos', 'bombona', 'panel' ]},
        { type: 'separator' },
        { label: 'Almacenes de artículos', routerLink: ['articulos', 'almacen', 'panel' ]},
        { label: 'Movimientos de estoc', routerLink: ['articulos', 'movimiento-estoc', 'panel' ]},
        { label: 'Recuentos de estoc', routerLink: ['articulos', 'recuento-estoc', 'panel' ]},
        { label: 'Traspasos entre almacenes', routerLink: ['articulos', 'traspaso-estoc', 'panel' ]}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Facturación',
      icon: 'payments',
      items: [
        {label: 'Presupuestos', routerLink: ['facturacion', 'presupuesto', 'panel']},
        {label: 'Albaranes', routerLink: ['facturacion', 'albaran', 'panel']},
        // {label: 'Facturar albaranes', routerLink: ['facturacion', 'grupo-facturas', 'form']},
        {type: 'separator'},
        {label: 'Facturas', routerLink: ['facturacion', 'factura', 'panel']},
        {type: 'separator'},
        {label: 'Tickets', routerLink: ['facturacion', 'ticket', 'panel']}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Técnicos',
      icon: 'work',
      items: [
        {
          label: 'Panel de técnicos',
          icon: 'handyman',
          routerLink: ['tecnicos', 'tecnico', 'panel']
        },
        {
          label: 'Panel de vehículos',
          icon: 'directions_car',
          routerLink: ['tecnicos', 'vehiculo', 'panel']
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Ajustes generales',
      icon: 'public',
      items: [
        {label: 'Listado de países', routerLink: ['common', 'pais', 'panel']},
        {label: 'Denominación vía', routerLink: ['common', 'denominacion-via', 'panel']},
        {label: 'Tipos de documentos', routerLink: ['common', 'tipo-documento', 'panel']},
        {label: 'Sectores y subsectores', routerLink: ['common', 'sector', 'panel']},
        {label: 'Modos de pago', routerLink: ['common', 'modo-de-pago', 'panel']},
        {label: 'Años fiscales', routerLink: ['common', 'anyo-fiscal', 'panel']}
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Configuración',
      icon: 'settings',
      items: [
        {label: 'Empresa', routerLink: ['configuracion', 'empresa', 'form', {id: 1}]},
        {label: 'Almacenes de gas', routerLink: ['configuracion', 'almacen-gas', 'panel']},
        {label: 'Usuarios', routerLink: ['usuarios', 'usuario', 'panel' ]}
      ]
    }
  ];

  headerMenu: AocUiDataMenu = [
  ];

  constructor() {
    AocModelManager.registerMeta(meta);
  }
}
