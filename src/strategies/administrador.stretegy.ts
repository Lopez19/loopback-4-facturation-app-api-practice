import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';

export class AdministradorStrategy implements AuthenticationStrategy {
  name: string = 'admin';

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
      if (info.data.rol == '6468fd4f021b9b1348757217') {
        let perfil: UserProfile = Object.assign({
          rol: info.data.rol,
          idUsuario: info.data.idUsuario,
          username: info.data.username,
          nombre: info.data.nombre,
          apellido: info.data.apellido,
          email: info.data.email,
        });
        return perfil;
      } else {
        throw new HttpErrors.Unauthorized(
          'El usuario no es administrador del sistema.',
        );
      }
    } else {
      throw new HttpErrors.Unauthorized('El token es inválido.');
    }
  }
}
