import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {RolRepository} from '../repositories/rol.repository';
import {GeneralFunctionsService, NotificationService} from '../services';
import {JwtService} from '../services/jwt.service';
import {Credenciales} from './../models/credenciales.model';

@authenticate('admin')
export class UsuariosController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @repository(RolRepository)
    public rolRepository: RolRepository,

    @service(GeneralFunctionsService)
    public generalFn: GeneralFunctionsService,
    @service(NotificationService)
    public notificationFn: NotificationService,
    @service(JwtService)
    public jwtService: JwtService,
  ) {}

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['idUsuario', 'message'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'idUsuario' | 'message'>,
  ): Promise<Usuario> {
    // Verificamos que el usuario no exista
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: {DNI: usuario.DNI},
    });

    if (usuarioExistente) {
      // Agregamos el mensaje de error al objeto usuarioExistente
      usuarioExistente.message = `El usuario con DNI ${usuario.DNI} ya existe`;

      // Omitimos los demas datos del usuarioExistente
      usuarioExistente.password = '';
      usuarioExistente.idUsuario = '';
      usuarioExistente.nombre = '';
      usuarioExistente.apellido = '';
      usuarioExistente.rolId = '';

      // Retornamos el usuarioExistente
      return usuarioExistente;
    }

    // Notificamos al usuario
    this.notificationFn.enviarEmail({
      email: usuario.email,
      asunto: 'Bienvenido a la plataforma',
      contenido: `
        <h1>Bienvenido a la plataforma FactuApp</h1>
        <p>Estimado ${usuario.nombre} ${usuario.apellido},</p>
        <p>Usted se ha registrado exitosamente en la plataforma.</p>
        <p>Para ingresar a la plataforma, haga click <a href="http://localhost:4200/login">aquí</a>.</p>
        <br>
        <ul>
        <li>Usuario: ${usuario.username}</li>
        <li>Contraseña: ${usuario.password}</li>
        </ul>
        <br>
        <p>Saludos cordiales,</p>
        <p>Equipo de soporte</p>
        `,
    });

    // Encriptamos la contraseña
    usuario.password = await this.generalFn.encriptarContraseña(
      usuario.password,
    );

    return this.usuarioRepository.create(usuario);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Usuario) where?: Where<Usuario>): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    // Omite la Contraseña
    const filter2 = {
      ...filter,
      fields: {
        ...filter?.fields,
        password: false,
      },
    };

    return this.usuarioRepository.find(filter2);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'})
    filter?: FilterExcludingWhere<Usuario>,
  ): Promise<Usuario> {
    // Omitir la contraseña
    filter = {
      ...filter,
      fields: {
        ...filter?.fields,
        password: false,
      },
    };

    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    // Si la contraseña no se ha modificado, omitimos la encriptación
    if (usuario.password === '') {
      const usuarioExistente = await this.usuarioRepository.findById(id);
      usuario.password = usuarioExistente.password;
    } else {
      // Encriptamos la contraseña
      usuario.password = await this.generalFn.encriptarContraseña(
        usuario.password,
      );
    }

    await this.usuarioRepository.replaceById(id, usuario);

    // Obtenemos el usuario actualizado
    // const usuarioActualizado = await this.usuarioRepository.findById(id);
    // const rolUser = await this.rolRepository.findById(usuarioActualizado.rolId);
    // usuarioActualizado.rolId = rolUser.nombre;
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  @authenticate.skip()
  @post('/login', {
    responses: {
      '200': {
        description: 'Login for user',
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {partial: true}),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<object> {
    // Comparar las credenciales con la base de datos (username y password)
    const usuario = await this.usuarioRepository.findOne({
      where: {
        username: credenciales.username,
      },
    });

    if (usuario) {
      // Verificamos la contraseña
      const contraseñaValida = await this.generalFn.compararContraseña(
        credenciales.password,
        usuario.password,
      );

      if (!contraseñaValida) {
        // Retornamos un mensaje de error 401 (Unauthorized)
        throw new HttpErrors[401](
          'Las credenciales no son correctas -> Contraseña incorrecta',
        );
      }

      // Generamos el token
      const token = this.jwtService.crearToken(usuario);

      // Omitimos la contraseña
      usuario.password = '';

      if (usuario.rolId) {
        const rol = await this.rolRepository.findById(usuario.rolId);
        usuario.rolId = rol.nombre;
      } else {
        usuario.rolId = 'Sin rol';
      }

      // Retornamos el token
      return {
        user: usuario,
        token: token,
      };
    } else {
      // Usuario no encontrado
      throw new HttpErrors[401](
        'Las credenciales no son correctas -> Usuario no encontrado',
      );
    }
  }
}
