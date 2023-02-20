import {Entity, model, property} from '@loopback/repository';
import {Detalle} from '../interfaces/IODetalle';
import {Encabezado} from '../interfaces/IOEncabezado';
import {Totales} from '../interfaces/IOTotales';

@model()
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idFactura?: number;

  @property({
    type: 'object',
    required: true,
  })
  encabezado: Encabezado;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  detalle: Detalle[];

  @property({
    type: 'object',
    required: true,
  })
  totales: Totales;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
