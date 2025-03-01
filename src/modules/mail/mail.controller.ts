import { Controller, Get, UseGuards, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthGuard } from '../auth/auth.guard';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mail')
@UseGuards(AuthGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Get('send')
  async sendTestEmail(@Body() body: SendEmailDto) {
    const to = body.email; // E-mail do destinatário
    const subject = 'Convite para cadastro';

    return await this.mailService.sendMail(to, subject);
  }
}
