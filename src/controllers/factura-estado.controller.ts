import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Estado, Factura} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaEstadoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) {}

  @get('/facturas/{id}/estado', {
    responses: {
      '200': {
        description: 'Estado belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async getEstado(
    @param.path.string('id') id: typeof Factura.prototype.idFactura,
  ): Promise<Estado> {
    return this.facturaRepository.estado(id);
  }
}
