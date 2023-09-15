import { Router } from 'express';
import { AocConfig, AocMikroRequestContext } from '@atlantis-of-code/aoc-server';
import { FicheroRouterMethods } from './fichero-router-methods';

export class FicheroRouter {

  _router: Router;

  private directorioBase = AocConfig.aocConfigEnvironment.custom.pathFicheros;

  constructor() {
    this._router = Router();
    this._router.get('/download/:id', AocMikroRequestContext.get(), FicheroRouterMethods.download(this.directorioBase));
  }

  get router() {
    return this._router;
  }

}
