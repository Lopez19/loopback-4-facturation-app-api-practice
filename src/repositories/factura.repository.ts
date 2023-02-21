import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FactMdbDataSource} from '../datasources';
import {Factura, FacturaRelations, Estado} from '../models';
import {EstadoRepository} from './estado.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.idFactura,
  FacturaRelations
> {

  public readonly estado: BelongsToAccessor<Estado, typeof Factura.prototype.idFactura>;

  constructor(
    @inject('datasources.fact_mdb') dataSource: FactMdbDataSource, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Factura, dataSource);
    this.estado = this.createBelongsToAccessorFor('estado', estadoRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
  }
}
