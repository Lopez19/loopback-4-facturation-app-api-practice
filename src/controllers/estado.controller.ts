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
import {Estado} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoController {
  constructor(
    @repository(EstadoRepository)
    public estadoRepository: EstadoRepository,
  ) {}

  @post('/estados')
  @response(200, {
    description: 'Estado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Estado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {
            title: 'NewEstado',
            exclude: ['idEstado'],
          }),
        },
      },
    })
    estado: Omit<Estado, 'idEstado'>,
  ): Promise<Estado> {
    return this.estadoRepository.create(estado);
  }

  @get('/estados/count')
  @response(200, {
    description: 'Estado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Estado) where?: Where<Estado>): Promise<Count> {
    return this.estadoRepository.count(where);
  }

  @get('/estados')
  @response(200, {
    description: 'Array of Estado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estado, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Estado) filter?: Filter<Estado>): Promise<Estado[]> {
    return this.estadoRepository.find(filter);
  }

  @patch('/estados')
  @response(200, {
    description: 'Estado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {partial: true}),
        },
      },
    })
    estado: Estado,
    @param.where(Estado) where?: Where<Estado>,
  ): Promise<Count> {
    return this.estadoRepository.updateAll(estado, where);
  }

  @get('/estados/{id}')
  @response(200, {
    description: 'Estado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Estado, {exclude: 'where'})
    filter?: FilterExcludingWhere<Estado>,
  ): Promise<Estado> {
    return this.estadoRepository.findById(id, filter);
  }

  @patch('/estados/{id}')
  @response(204, {
    description: 'Estado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estado, {partial: true}),
        },
      },
    })
    estado: Estado,
  ): Promise<void> {
    await this.estadoRepository.updateById(id, estado);
  }

  @put('/estados/{id}')
  @response(204, {
    description: 'Estado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estado: Estado,
  ): Promise<void> {
    await this.estadoRepository.replaceById(id, estado);
  }

  @del('/estados/{id}')
  @response(204, {
    description: 'Estado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoRepository.deleteById(id);
  }
}
