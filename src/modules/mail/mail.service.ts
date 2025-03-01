import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StatusInvitationService } from '../status_invitation/status_invitation.service';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer;
  constructor(
    private readonly configService: ConfigService,
    private readonly statusInvitationService: StatusInvitationService,
    private readonly jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string) {
    const hasInvite = await this.statusInvitationService.findOneByEmail(to);

    if (hasInvite?.statusId == 2) {
      throw new HttpException(
        'O convite já foi enviado para o colaborador',
        500,
      );
    }

    if (hasInvite?.statusId == 3) {
      throw new HttpException('Convite Expiradoo', 500);
    }
    const token = this.generetaToken(to);
    const link = this.configService.get('ORIGIN_URL') + token + '&email=' + to;

    console.log(link);
    try {
      await this.transporter.sendMail({
        from: `Technology_Solutions'`,
        to: to,
        subject: subject,
        secure: false,
        text: 'Você foi convidado para se cadastrar!',
        html: `
            <html>
            <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
                    <h1 style="color: #333333;">Você foi convidado!</h1>
                    <p style="color: #555555;">Olá, você foi convidado para se cadastrar na nossa plataforma.</p>
                    <p style="color: #555555;">Clique no botão abaixo para iniciar o processo de cadastro:</p>
                    <p style="color: #555555;">Este link é valido por 24hrs:</p>
                    <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">Cadastrar Agora</a>
                </div>
                <footer style="margin-top: 20px; color: #777777; font-size: 14px;">
                    <p>&copy; 2025 Technology_solutions. Todos os direitos reservados.</p>
                </footer>
            </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new Error('Erro ao enviar e-mail');
    }

    const data = {
      email: to,
      statusId: 2,
    };

    //Gravar o convite enviado
    await this.statusInvitationService.createInviation(data);

    return { message: `Email enviado para ${to}` };
  }

  private generetaToken(email: string): string {
    return this.jwtService.sign(
      { email },
      {
        secret: process.env.EMAIL_SECRET,
        expiresIn: process.env.EMAIL_EXPIRATION_TIME,
      },
    );
  }
}
