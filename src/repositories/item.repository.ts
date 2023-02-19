import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FactDbDataSource} from '../datasources';
import {Item, ItemRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.iditem,
  ItemRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof Item.prototype.iditem>;

  constructor(
    @inject('datasources.fact_db') dataSource: FactDbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Item, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
