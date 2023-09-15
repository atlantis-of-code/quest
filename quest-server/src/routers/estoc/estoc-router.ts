import { Router } from 'express';
import { EstocRouterMethods } from './estoc-router-methods';
import { AocMikroRequestContext } from '@atlantis-of-code/aoc-server';

export class EstocRouter {

  public get router() {
    return this._router;
  }

  private _router: Router;

  constructor() {
    this._router = Router();
    this._router.post('/cargar_fichero_inventario', AocMikroRequestContext.get(), EstocRouterMethods.cargarFicheroInventario());
  }
}
