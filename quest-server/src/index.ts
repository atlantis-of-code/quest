import 'reflect-metadata';
import {AocReport, AocServer} from '@atlantis-of-code/aoc-server';
import Big from 'big.js';
import * as dateFns from 'date-fns';

AocReport.globalLocals.dateFns = dateFns;
AocReport.globalLocals.numberFormat = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format;
AocReport.globalLocals.Big = Big;

require('express-async-errors');

const aocServer = new AocServer({
  customRouters: [
  ]
});

aocServer.listen();
