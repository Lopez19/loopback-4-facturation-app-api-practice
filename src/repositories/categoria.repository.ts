import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FactDbDataSource} from '../datasources';
import {Categoria, CategoriaRelations} from '../models';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.idcategoria,
  CategoriaRelations
> {
  constructor(
    @inject('datasources.fact_db') dataSource: FactDbDataSource,
  ) {
    super(Categoria, dataSource);
  }
}
