import { NextFunction, Request, Response } from 'express';
import { FilterQuery, RequestContext } from '@mikro-orm/core';
import { Pedido } from '../../entities/pedidos/pedido';
import * as ExcelJs from 'exceljs';
import * as path from 'path';
import { format } from 'date-fns';

export class PedidoRouterMethods {

  static altaMasivaNace() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const pedidoIds: string[] = req.body.ids;
      const filter: FilterQuery<Pedido> = pedidoIds?.length ? pedidoIds : { alta_en_nace: false };
      const pedidos = await RequestContext.getEntityManager().find(
        Pedido,
        filter,
        {
          orderBy: { fecha_creacion: 'asc' },
          populate: ['contrato.cliente', 'repartidor', 'ruta', 'modoDePago', 'lineaPedidoCollection.bombona']
        });
      if (!pedidos.length) {
        throw new Error('No se han encontrado pedidos para realizar el fichero de alta masiva en Nace');
      }
      res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=alta.xlsx`
      });
      const workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(path.join(process.cwd(), 'public', 'PlantillaAltaMasivaPedidos.xlsx'));
      const worksheet = workbook.worksheets[0];
      let rowIndex = 1;
      for (const pedido of pedidos) {
        for (const lineaPedido of pedido.lineaPedidoCollection) {
          rowIndex++;
          const row: any = [];
          row.push(pedido.contrato.numero_poliza);
          row.push(pedido.contrato.cliente.embInfoContacto.telefono1);
          row.push(lineaPedido.bombona.codigo_nace);
          row.push(lineaPedido.cantidad);
          row.push('07085');
          row.push(format(pedido.fecha_entrega, 'dd/MM/yyyy'));
          row.push(pedido.repartidor.numero_documento);
          row.push(''); // No ponemos la ruta en el fichero excel
          row.push(format(pedido.fecha_creacion, 'dd/MM/yyyy'));
          row.push(pedido.urgente ? 'SI' : 'NO');
          row.push(pedido.envio_inmediato_movilidad ? 'SI' : 'NO');
          row.push(pedido.modoDePago?.codigo_nace ?? '');
          row.push(pedido.peticion_factura ? 'SI' : 'NO');
          row.push(''); // TODO: Demanar ref cliente
          row.push(pedido.observaciones_pedido.slice(0, 250));
          worksheet.insertRow(rowIndex, row);
        }
      }
      await workbook.xlsx.write(res);
    }
  }

}
