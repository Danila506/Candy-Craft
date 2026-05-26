import { CreateContactMessageDto } from "./dto/create-contact-message.dto";
export declare class ContactController {
  private readonly logger;
  create(dto: CreateContactMessageDto): {
    message: string;
  };
}
