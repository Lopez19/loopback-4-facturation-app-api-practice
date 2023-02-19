import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Item,
  Producto,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemProductoController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.number('id') id: typeof Item.prototype.iditem,
  ): Promise<Producto> {
    return this.itemRepository.producto(id);
  }
}
