import { AocReport, AocReportLocals, AocServer } from '@atlantis-of-code/aoc-server';
import { EntityManager, RequestContext } from '@mikro-orm/core';
import * as dateFns from 'date-fns';
import { Request, Response } from 'express';
import * as path from 'path';
import { Albaran } from '../../entities/facturacion/albaran';
import { LineaAlbaran } from '../../entities/facturacion/linea-albaran';

export class AlbaranReport extends AocReport {

  public reportName = 'Albarán';
  public reportEndpointPath = 'albaran';
  public pugFile = 'albaran.pug';

  public async getLocals(req: Request, res: Response): Promise<Partial<AocReportLocals>> {
    if (!req.query.id) {
      throw new Error('No id as query param...');
    }
    const id: string = req.query.id as string;

    return await this.doGetLocals(id, RequestContext.getEntityManager());
  }

  public async doGetLocals(id: string, em: EntityManager) {
    const albaran = await em.findOne(Albaran, {id}, {
      populate: [
        'anyoFiscal',
        'cliente',
        'direccionFiscal',
        'direccionObra',
        'lineaAlbaranCollection.articulo'
      ],
      orderBy: {
        [Albaran.collection.LINEA_ALBARAN]: {
          [LineaAlbaran.field.ORDEN]: 'asc'
        }
      }
    });

    // console.log(albaran);

    return {
      albaran
    };
  }

  public getWkHtmlArgs(locals: AocReportLocals): string[] {
    let args = {};
    const albaran = locals.albaran as Albaran;
    const title = `Alb. ${albaran.numero} (${dateFns.format(albaran.fecha, 'dd/MM/yyyy')})`;
    args = {
      '--page-size': 'A5',
      '--title': `"${title}"`,
      '-T': '5mm',
      '-B': '30mm',
      '-L': '6mm',
      '-R': '6mm',
      // '-R': '8.25mm',
      // '--header-html': `${path.join(AocServer.aocServerOptions.reportsDir, '/_headers/left-text.html')}`,
      '--footer-html': `${path.join(AocServer.aocServerOptions.reportsDir, '/_footers/footer.html')}`,
      '--footer-spacing': '10'
    };
    const argsAsArray = [];
    for (const arg in args) {
      if (args.hasOwnProperty(arg)) {
        argsAsArray.push(arg);
        argsAsArray.push(args[arg]);
      }
    }
    return argsAsArray;
  }

}
