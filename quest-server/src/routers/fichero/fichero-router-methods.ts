import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { RequestContext } from '@mikro-orm/core';
import { Fichero } from '../../entities/ficheros/fichero';


export class FicheroRouterMethods {

  public static download(directorioBase: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id as string;
      const em = RequestContext.getEntityManager();
      const fichero = await em.findOneOrFail(Fichero, { id });
      let directoryPath = path.join(directorioBase, fichero.directorio, fichero.referencia_id);
      if (fichero.subdirectorio) {
        directoryPath = path.join(directoryPath, fichero.subdirectorio);
      }
      res.download(path.join(directoryPath, fichero.nombre), console.error);
    }
  }

}
