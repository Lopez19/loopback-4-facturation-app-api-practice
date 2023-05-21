import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {Usuario} from '../models/usuario.model';
dotenv.config();

const pe = process.env;

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  crearToken(usuario: Usuario) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          idUsuario: usuario.idUsuario,
          username: usuario.username,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.rolId,
        },
      },
      pe.JWT_SECRET || 'secret',
    );
    return token;
  }

  verificarToken(token: string) {
    let decoded: any;
    try {
      jwt.verify(token, pe.JWT_SECRET || 'secret', (err, decodedToken) => {
        if (err) {
          throw new Error(err.message);
        }
        decoded = decodedToken;
      });
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
