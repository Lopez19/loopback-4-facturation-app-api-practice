import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FactMdbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.idRol,
  RolRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype.idRol>;

  constructor(
    @inject('datasources.fact_mdb') dataSource: FactMdbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
