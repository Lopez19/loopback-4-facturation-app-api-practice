import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FactMdbDataSource} from '../datasources';
import {Factura, FacturaRelations} from '../models';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.idFactura,
  FacturaRelations
> {
  constructor(
    @inject('datasources.fact_mdb') dataSource: FactMdbDataSource,
  ) {
    super(Factura, dataSource);
  }
}
