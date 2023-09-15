import 'reflect-metadata';
import { AocReport, AocServer } from '@atlantis-of-code/aoc-server';
import Big from 'big.js';
import * as dateFns from 'date-fns';
import { FicheroRouter } from './routers/fichero/fichero-router';
import { EstocRouter } from './routers/estoc/estoc-router';
import { PedidoRouter } from './routers/pedido/pedido-router';

AocReport.globalLocals.dateFns = dateFns;
AocReport.globalLocals.numberFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format;
AocReport.globalLocals.Big = Big;
// AocReport.globalLocals.ReportUtils = ReportUtils;

require('express-async-errors');

// AocMail.initUserEmails();


const aocServer = new AocServer({
  customRouters: [
    {
      path: '/ficheros',
      checkAuth: true,
      router: new FicheroRouter().router
    },
    {
      path: '/estoc',
      checkAuth: true,
      router: new EstocRouter().router
    },
    {
      path: '/pedido',
      checkAuth: true,
      router: new PedidoRouter().router
    }
  ]
});

aocServer.listen();
