// Mikro-ORM imports
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property } from '@mikro-orm/core';
// QuestEntity import
import { QuestEntity } from '../quest-entity';
// Entities imports
import { Contrato } from '../contratos/contrato';
import { Factura } from '../facturacion/factura';
import { Ticket } from '../facturacion/ticket';
import { TipoDocumento } from './tipo-documento';

@Entity({ tableName: 'common.datos_fiscales' })
export class DatosFiscales extends QuestEntity {

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

  @Property({ nullable: true })
  apellido_1?: string;

  @Property({ nullable: true })
  apellido_2?: string;

  @Property({ nullable: true })
  nombre_fiscal?: string;

  @Property({ nullable: true })
  numero_documento?: string;

  // Entities

  @ManyToOne({ entity: () => 'TipoDocumento', fieldName: 'tipo_documento_id', eager: true, nullable: true })
  tipoDocumento?: TipoDocumento;

  // Mapped collections and inversed entities

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.datosFiscales, orphanRemoval: false })
  contratoCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Contrato', mappedBy: (e: Contrato) => e.pagadorAlternativoDatosFiscales, orphanRemoval: false })
  contratoDatosFiscalesPagadorAlternativoCollection: Collection<Contrato> = new Collection<Contrato>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.copiaDatosCliente, orphanRemoval: false })
  facturaDatosFiscalesCopiaClienteCollection: Collection<Factura> = new Collection<Factura>(this);

  @OneToMany({ entity: () => 'Factura', mappedBy: (e: Factura) => e.copiaDatosEmpresa, orphanRemoval: false })
  facturaDatosFiscalesCopiaEmpresaCollection: Collection<Factura> = new Collection<Factura>(this);

  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.copiaDatosCliente, orphanRemoval: false })
  ticketDatosFiscalesCopiaClienteCollection: Collection<Ticket> = new Collection<Ticket>(this);

  @OneToMany({ entity: () => 'Ticket', mappedBy: (e: Ticket) => e.copiaDatosEmpresa, orphanRemoval: false })
  ticketDatosFiscalesCopiaEmpresaCollection: Collection<Ticket> = new Collection<Ticket>(this);

}
