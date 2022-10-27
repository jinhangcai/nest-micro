import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}
  async sendEmail() {
    await this.mailerService.sendMail({
      to: '374121185@qq.com',
      from: '654870345@qq.com',
      // subject: 'Testing Nest MailerModule ✔',
      subject: 'Walker Lee Love You ✔',
      // html: '<b>Welcome Frost!</b>',
      template: './welcome',
      context: {
        // Data to be sent to template engine.
        code: 'cf1a3f828287',
        username: 'walker lee',
      },
    });
  }

}
