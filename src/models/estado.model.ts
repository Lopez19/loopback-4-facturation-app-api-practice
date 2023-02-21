import {Entity, hasMany, model, property} from '@loopback/repository';
import {Factura} from './factura.model';

@model()
export class Estado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idEstado?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
