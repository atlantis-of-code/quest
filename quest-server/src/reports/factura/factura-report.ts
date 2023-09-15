import { AocReport, AocReportLocals, AocServer } from '@atlantis-of-code/aoc-server';
import { EntityManager, RequestContext } from '@mikro-orm/core';
import * as dateFns from 'date-fns';
import { Request, Response } from 'express';
import * as path from 'path';
import { Albaran } from '../../entities/facturacion/albaran';
import { Factura } from '../../entities/facturacion/factura';
import { LineaAlbaran } from '../../entities/facturacion/linea-albaran';
import { Presupuesto } from '../../entities/facturacion/presupuesto';

export class FacturaReport extends AocReport {

  public reportName = 'Factura';
  public reportEndpointPath = 'factura';
  public pugFile = 'factura.pug';

  public async getLocals(req: Request, res: Response): Promise<Partial<AocReportLocals>> {
    if (!req.query.id) {
      throw new Error('No id as query param...');
    }
    const id: string = req.query.id as string;

    return await this.doGetLocals(id, RequestContext.getEntityManager());
  }

  public async doGetLocals(id: string, em: EntityManager) {
    const factura = await em.findOne(Factura, {id}, {
      populate: [
        'anyoFiscal',
        'copiaDatosCliente',
        'copiaDatosEmpresa',
        'direccionFiscal',
        'direccionObra',
        'albaranCollection'
      ],
      orderBy: {
        [Factura.collection.ALBARAN]: {
          [Albaran.field.FECHA]: 'asc'
        }
      }
    });

    console.log(factura);

    return {
      factura
    };
  }

  public getWkHtmlArgs(locals: AocReportLocals): string[] {
    let args = {};
    const factura = locals.factura as Factura;
    const title = `Pres. ${factura.numero} (${dateFns.format(factura.fecha, 'dd/MM/yyyy')})`;
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
