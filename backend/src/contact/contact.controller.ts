import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  @Post()
  @HttpCode(202)
  create(@Body() dto: CreateContactMessageDto) {
    this.logger.log(
      `Contact message from ${dto.email}: ${dto.name}, phone=${dto.phone ?? 'n/a'}`,
    );

    return { message: 'Contact message accepted' };
  }
}
