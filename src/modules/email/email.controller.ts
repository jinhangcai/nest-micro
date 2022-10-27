import { Controller, Get, } from "@nestjs/common";
import { EmailService } from './email.service';
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('/发送Email邮件')
@Controller('/email')
export class EmailController {
  constructor(private readonly EmailService: EmailService) {}


  @ApiResponse({
    status: 200,
    description: '向某人发送邮件',
  })
  @Get('/sendEmail')
  getHello(): string {
    this.EmailService.sendEmail();
    return 'send message'
  }
}