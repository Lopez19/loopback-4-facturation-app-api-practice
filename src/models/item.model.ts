import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Producto} from './producto.model';

@model({
  settings: {
    foreignKeys: {
      fk_producto_id: {
        name: 'fk_producto_id',
        entity: 'Producto',
        entityKey: 'idproducto',
        foreignKey: 'productoId',
      },
    },
  },
})
export class Item extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  iditem?: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Producto)
  productoId: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
