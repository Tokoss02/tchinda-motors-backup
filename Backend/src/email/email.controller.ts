import { Controller, Get, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { ContactDto } from 'src/contact/ContactDto';

@Controller('email')
export class EmailController {
  constructor(private readonly mailService: MailService) {}

  @Post('contact')
  async handleContact(@Body() body: ContactDto) {
    await this.mailService.sendContactEmail(body); // This should be defined in your mail.service.ts
    return { message: 'Message sent successfully' };
  }

  @Get('send-test-email')
  async sendTestEmail() {
    await this.mailService.sendTestEmail(); // Define this method in your MailService
    return { message: 'Test email sent successfully' };
  }
}
