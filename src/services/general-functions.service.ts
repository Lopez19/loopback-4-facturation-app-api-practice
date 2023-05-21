import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import bcryptjs from 'bcryptjs';

@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFunctionsService {
  // Encriptar contraseña
  encriptarContraseña(clave: string): Promise<string> {
    return bcryptjs.hash(clave, 10);
  }

  // Comparar contraseña
  compararContraseña(clave: string, claveEncriptada: string): Promise<boolean> {
    return bcryptjs.compare(clave, claveEncriptada);
  }
}
