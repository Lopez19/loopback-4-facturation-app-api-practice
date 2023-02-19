import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Categoria} from './categoria.model';

@model({
  settings: {
    foreignKeys: {
      fk_categoria_id: {
        name: 'fk_categoria_id',
        entity: 'Categoria',
        entityKey: 'idcategoria',
        foreignKey: 'categoriaId',
      },
    },
  },
})
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idproducto?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  detalle?: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Categoria)
  categoriaId: number;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
