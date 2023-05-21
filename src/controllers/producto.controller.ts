import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Producto} from '../models';
import {ProductoRepository} from '../repositories';

@authenticate('admin')
export class ProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) {}

  @post('/productos')
  @response(200, {
    description: 'Producto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Producto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProducto',
            exclude: ['idproducto'],
          }),
        },
      },
    })
    producto: Omit<Producto, 'idproducto'>,
  ): Promise<Producto> {
    return this.productoRepository.create(producto);
  }

  @get('/productos/count')
  @response(200, {
    description: 'Producto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Producto) where?: Where<Producto>): Promise<Count> {
    return this.productoRepository.count(where);
  }

  @get('/productos')
  @response(200, {
    description: 'Array of Producto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Producto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Producto) filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.productoRepository.find(filter);
  }

  @patch('/productos')
  @response(200, {
    description: 'Producto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
    @param.where(Producto) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoRepository.updateAll(producto, where);
  }

  @get('/productos/{id}')
  @response(200, {
    description: 'Producto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Producto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Producto, {exclude: 'where'})
    filter?: FilterExcludingWhere<Producto>,
  ): Promise<Producto> {
    return this.productoRepository.findById(id, filter);
  }

  @patch('/productos/{id}')
  @response(204, {
    description: 'Producto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
  ): Promise<void> {
    await this.productoRepository.updateById(id, producto);
  }

  @put('/productos/{id}')
  @response(204, {
    description: 'Producto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() producto: Producto,
  ): Promise<void> {
    await this.productoRepository.replaceById(id, producto);
  }

  @del('/productos/{id}')
  @response(204, {
    description: 'Producto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoRepository.deleteById(id);
  }
}
