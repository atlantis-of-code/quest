import { AocReport, AocReportLocals, AocServer } from '@atlantis-of-code/aoc-server';
import { EntityManager, RequestContext } from '@mikro-orm/core';
import * as dateFns from 'date-fns';
import { Request, Response } from 'express';
import * as path from 'path';
import { LineaAlbaran } from '../../entities/facturacion/linea-albaran';
import { Presupuesto } from '../../entities/facturacion/presupuesto';

export class PresupuestoReport extends AocReport {

  public reportName = 'Presupuesto';
  public reportEndpointPath = 'presupuesto';
  public pugFile = 'presupuesto.pug';

  public async getLocals(req: Request, res: Response): Promise<Partial<AocReportLocals>> {
    if (!req.query.id) {
      throw new Error('No id as query param...');
    }
    const id: string = req.query.id as string;

    return await this.doGetLocals(id, RequestContext.getEntityManager());
  }

  public async doGetLocals(id: string, em: EntityManager) {
    const presupuesto = await em.findOne(Presupuesto, {id}, {
      populate: [
        'anyoFiscal',
        'cliente',
        'direccionFiscal',
        'direccionObra',
        'lineaPresupuestoCollection'
      ],
      orderBy: {
        [Presupuesto.collection.LINEA_PRESUPUESTO]: {
          [LineaAlbaran.field.ORDEN]: 'asc'
        }
      }
    });

    // console.log(presupuesto);

    return {
      presupuesto
    };
  }

  public getWkHtmlArgs(locals: AocReportLocals): string[] {
    let args = {};
    const presupuesto = locals.presupuesto as Presupuesto;
    const title = `Pres. ${presupuesto.numero} (${dateFns.format(presupuesto.fecha, 'dd/MM/yyyy')})`;
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
