import {belongsTo, Entity, model, property} from '@loopback/repository';
import * as FacturaI from '../interfaces/IOFactura';
import {Estado} from './estado.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idFactura?: string;

  @property({
    type: 'object',
    required: true,
  })
  encabezado: FacturaI.Encabezado;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  detalle: FacturaI.Detalle[];

  @property({
    type: 'object',
    required: true,
  })
  totales: FacturaI.Totales;

  @belongsTo(() => Estado)
  estadoId: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
