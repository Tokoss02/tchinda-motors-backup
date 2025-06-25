// src/cars/car.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarSchema } from './schemas/car.schema';
import { MailService } from 'src/email/mail.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
  ],
  controllers: [CarController],
  providers: [CarService, MailService],
  exports: [CarService], 
})
export class CarModule {}
