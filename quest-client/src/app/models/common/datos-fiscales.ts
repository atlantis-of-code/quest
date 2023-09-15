// MavermaModel import
import { MavermaModel } from '../maverma-model';
// Model imports
import { Contrato } from '../contratos/contrato';
import { Factura } from '../facturacion/factura';
import { Ticket } from '../facturacion/ticket';
import { TipoDocumento } from './tipo-documento';

export class DatosFiscales extends MavermaModel {

  static field = {
    APELLIDO_1: 'apellido_1',
    APELLIDO_2: 'apellido_2',
    NOMBRE_FISCAL: 'nombre_fiscal',
    NUMERO_DOCUMENTO: 'numero_documento',
  };

  static entity = {
    TIPO_DOCUMENTO: 'tipoDocumento',
  };

  static collection = {
    CONTRATO: 'contratoCollection',
    CONTRATO_DATOS_FISCALES_PAGADOR_ALTERNATIVO: 'contratoDatosFiscalesPagadorAlternativoCollection',
    FACTURA_DATOS_FISCALES_COPIA_CLIENTE: 'facturaDatosFiscalesCopiaClienteCollection',
    FACTURA_DATOS_FISCALES_COPIA_EMPRESA: 'facturaDatosFiscalesCopiaEmpresaCollection',
    TICKET_DATOS_FISCALES_COPIA_CLIENTE: 'ticketDatosFiscalesCopiaClienteCollection',
    TICKET_DATOS_FISCALES_COPIA_EMPRESA: 'ticketDatosFiscalesCopiaEmpresaCollection',
  };


  // Fields

  apellido_1?: string;
  apellido_2?: string;
  nombre_fiscal?: string;
  numero_documento?: string;

  // Models

  tipoDocumento?: TipoDocumento;

  // Mapped collections and inversed models

  contratoCollection: Contrato[];
  contratoDatosFiscalesPagadorAlternativoCollection: Contrato[];
  facturaDatosFiscalesCopiaClienteCollection: Factura[];
  facturaDatosFiscalesCopiaEmpresaCollection: Factura[];
  ticketDatosFiscalesCopiaClienteCollection: Ticket[];
  ticketDatosFiscalesCopiaEmpresaCollection: Ticket[];

}
