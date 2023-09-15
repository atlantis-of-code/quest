import { Router } from 'express';
import { PedidoRouterMethods } from './pedido-router-methods';
import { AocMikroRequestContext } from '@atlantis-of-code/aoc-server';

export class PedidoRouter {
  private _router: Router;

  get router()  {
    return this._router;
  }

  constructor() {
    this._router = Router();
    this._router.post('/alta-masiva-nace', AocMikroRequestContext.get(), PedidoRouterMethods.altaMasivaNace());
  }
}
