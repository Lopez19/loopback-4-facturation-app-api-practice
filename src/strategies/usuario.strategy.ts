import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';

export class UsuarioStrategy implements AuthenticationStrategy {
  name: string = 'usuario';

  constructor(
    @service(JwtService)
    public jwtService: JwtService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);

    if (!token) {
      throw new HttpErrors.Unauthorized('No se proporcionó ningún token.');
    }

    let info = this.jwtService.verificarToken(token);
    if (info) {
      if (info.data.rol == '6468fd99021b9b1348757218') {
        let perfil: UserProfile = Object.assign({
          rol: info.data.rol,
          idUsuario: info.data.idUsuario,
          DNI: info.data.DNI,
          username: info.data.username,
          nombre: info.data.nombre,
          apellido: info.data.apellido,
          email: info.data.email,
        });
        return perfil;
      } else {
        throw new HttpErrors.Unauthorized(
          'El usuario no tiene permisos para acceder a este recurso',
        );
      }
    } else {
      throw new HttpErrors.Unauthorized('El token es inválido.');
    }
  }
}
