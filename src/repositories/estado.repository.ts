import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FactMdbDataSource} from '../datasources';
import {Estado, EstadoRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.idEstado,
  EstadoRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Estado.prototype.idEstado>;

  constructor(
    @inject('datasources.fact_mdb') dataSource: FactMdbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Estado, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
