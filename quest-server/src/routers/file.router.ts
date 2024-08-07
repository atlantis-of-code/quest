import { AocConfig, AocMikroRequestContext } from '@atlantis-of-code/aoc-server';
import { RequestContext } from '@mikro-orm/core';
import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import { File } from '../entities/files/file';

export class FileRouter {
  private readonly _router: Router;

  public get router() {
    return this._router;
  }

  private filePath = AocConfig.aocConfigEnvironment.custom.filePath;

  constructor() {
    this._router = Router();
    this._router.get('/get/:id', AocMikroRequestContext.get(), this.get());
    this._router.get('/download/:id', AocMikroRequestContext.get(), this.download());
  }

  private get() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const em = RequestContext.getEntityManager();
        const appFile = await em.findOneOrFail(File, {id: req.params.id});
        res.setHeader('Content-disposition', 'inline; filename="' + appFile.name + '"');
        res.setHeader('Content-type', appFile.mime);
        res.download(this.getPath(appFile), next)
      } catch (e) {
        next(e);
      }
    }
  }

  private download() {
    return async (req: Request, res: Response, next: NextFunction)=> {
      try {
        const em = RequestContext.getEntityManager();
        const appFile = await em.findOneOrFail(File, {id: req.params.id});
        res.download(this.getPath(appFile), next)
      } catch (e) {
        next(e);
      }
    }
  }

  private getPath(appFile: File) {
    const pathParts = [this.filePath, appFile.directory, appFile.ref_id, appFile.name];
    if (appFile.subdirectory) {
      pathParts.splice(3, 0, appFile.subdirectory);
    }
    return path.join(...pathParts);
  }

}
