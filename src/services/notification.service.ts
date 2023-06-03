import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import dotenv from 'dotenv';
import mg from 'mailgun-js';
dotenv.config();

const pe = process.env;

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  async enviarEmail({
    email,
    asunto,
    contenido,
  }: {
    email: string;
    asunto: string;
    contenido: string;
  }) {
    const mailgun = () =>
      mg({
        apiKey: pe.MAILGUN_API_KEY ?? '',
        domain: pe.MAILGUN_DOMAIN ?? '',
      });

    const data = {
      from: pe.MAILGUN_FROM,
      to: email,
      subject: asunto,
      html: contenido,
    };

    await mailgun()
      .messages()
      .send(data, (error, body) => {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Email enviado a ${email} exitosamente! -> idMsj: ${body.id}`,
          );
        }
      });
  }
}
