import { AocMikroRequestContext, AocMikroEntityManager, AocLogger } from '@atlantis-of-code/aoc-server';
import { format } from 'date-fns';
import * as ExcelJs from 'exceljs';
import { NextFunction, Request, Response, Router } from 'express';
import { File } from '../entities/files/file';
import { Stock } from '../entities/items/stock';
import { StockCount } from '../entities/items/stock-count';
import { StockLog } from '../entities/items/stock-log';

export class StockRouter {
  get router() {
    return this.$router;
  }
  readonly $router: Router;

  constructor() {
    this.$router = Router();
    this.$router.post('/load_stock_count_file', AocMikroRequestContext.get(), this.loadStockCountFile());
  }

  private loadStockCountFile() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const aem = new AocMikroEntityManager();
      try {
        const payload = req.body.payload;
        const buffer = Buffer.from(payload, 'base64');
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.load(buffer);
        const sheet = workbook.getWorksheet('stock');

        await aem.begin();

        const file = new File();
        file.raw = payload;
        file.directory = 'Stock count';
        file.name = req.body.fileName;
        file.mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        file.ref_class = 'items.stock_count';

        const stockCount = new StockCount();
        stockCount.date = aem.transactionDate;
        stockCount.file = file;
        await aem.persist(stockCount);

        let rowIndex = 2;
        while (true) {
          const row = sheet.getRow(rowIndex);
          const id = row.getCell(1).value?.toString();
          const quantity = row.getCell(5).value?.toString();
          if (!id || !quantity) {
            break;
          }
          const stock = await aem.em.findOne(Stock, { id });
          const stockLog = new StockLog();
          stockLog.date = aem.transactionDate;
          stockLog.stockCount = stockCount;
          stockLog.previous_stock = '-1';
          stockLog.quantity = quantity;
          stockLog.store = stock.store;
          stockLog.item = stock.item;
          stockLog.type = 'Count';
          stockLog.document_name = format(stockCount.date, 'dd/MM/yyyy HH:mm:ss');
          stockLog.document_operation = 'New';
          stockLog.description = 'New stock count (absolute value)';
          await aem.persist(stockLog);
          rowIndex++;
        }
        // Commit y data emmit
        await aem.commit();
        res.json({ ok: true });
      } catch (e) {
        await aem.rollback();
        AocLogger.l.error(e);
        next(e);
      }
    };
  }
}
