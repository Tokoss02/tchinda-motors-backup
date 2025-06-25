import { Module } from '@nestjs/common';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';
import { Inquiry, InquirySchema } from './Schemas/inquiry.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from 'src/email/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CarModule } from 'src/cars/car.module'; 

@Module({

   imports: [
    MongooseModule.forFeature([{ name: Inquiry.name, schema: InquirySchema }]),
     MailerModule,
    CarModule,
  ],
  controllers: [InquiryController],
  providers: [InquiryService, MailService],
})
export class InquiryModule {}
