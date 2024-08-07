import 'reflect-metadata';
import {AocReport, AocServer} from '@atlantis-of-code/aoc-server';
import Big from 'big.js';
import * as dateFns from 'date-fns';
import { FileRouter } from './routers/file.router';
import { StockRouter } from './routers/stock.router';
import {CorsAnywhereRouter} from './routers/cors-anywhere-router';

AocReport.globalLocals.dateFns = dateFns;
AocReport.globalLocals.numberFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format;
AocReport.globalLocals.Big = Big;

require('express-async-errors');

const aocServer = new AocServer({
  customRouters: [
    {
      path: '/file',
      router: new FileRouter().router,
      checkAuth: true
    },
    {
      path: '/stock',
      router: new StockRouter().router,
      checkAuth: true
    },
    {
      path: '/cors-anywhere',
      router: new CorsAnywhereRouter().router,
      checkAuth: true
    },
  ]
});

aocServer.listen();
