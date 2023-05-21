import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Rol, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioRolController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) {}

  @get('/usuarios/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
  ): Promise<Rol> {
    return this.usuarioRepository.rol(id);
  }
}
