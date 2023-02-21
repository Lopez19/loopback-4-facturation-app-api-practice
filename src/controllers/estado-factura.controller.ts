import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Estado, Factura} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoFacturaController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) {}

  @get('/estados/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Estado has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.estadoRepository.facturas(id).find(filter);
  }

  @post('/estados/{id}/facturas', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estado.prototype.idEstado,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInEstado',
            exclude: ['idFactura'],
            optional: ['estadoId'],
          }),
        },
      },
    })
    factura: Omit<Factura, 'idFactura'>,
  ): Promise<Factura> {
    return this.estadoRepository.facturas(id).create(factura);
  }

  @patch('/estados/{id}/facturas', {
    responses: {
      '200': {
        description: 'Estado.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura))
    where?: Where<Factura>,
  ): Promise<Count> {
    return this.estadoRepository.facturas(id).patch(factura, where);
  }

  @del('/estados/{id}/facturas', {
    responses: {
      '200': {
        description: 'Estado.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura))
    where?: Where<Factura>,
  ): Promise<Count> {
    return this.estadoRepository.facturas(id).delete(where);
  }
}
