import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Inquiry, InquiryDocument } from './Schemas/inquiry.schema';
import { MailService } from 'src/email/mail.service';
import { CarService } from 'src/cars/car.service';
import { generateCarSlug } from 'src/utils/slug.util';

@Injectable()
export class InquiryService {
  constructor(
    @InjectModel(Inquiry.name) private inquiryModel: Model<InquiryDocument>,
    private readonly mailService: MailService,
    private readonly carService: CarService,
  ) { }


  async create(inquiryDto: CreateInquiryDto) {
    const inquiry = new this.inquiryModel(inquiryDto);
    await inquiry.save();

    let carSlug: string | undefined = undefined;
    let fullCarUrl: string | undefined;

    try {
      // Make sure both brand and model slugs are present
      if (inquiryDto.brandSlug && inquiryDto.modelSlug) {
        const cars = await this.carService.findByBrandAndModelSlug(
          inquiryDto.brandSlug,
          inquiryDto.modelSlug,
        );

        if (Array.isArray(cars) && cars.length > 0) {
          // Choose the most recent or most relevant car
          const car = cars[0];

          // ✅ Generate full unique slug from actual car fields
          carSlug = generateCarSlug(
            car.brand ?? 'unknown',
            car.modelCar ?? 'unknown',
            car.trimLevel ?? 'base',
            `${car.engine ?? '0'}l`,
            String(car.year ?? '0000'),
            car.exteriorColor ?? 'white',
            (car._id as any)?.toString().slice(-6) ?? 'xxxxxx',
          );

          // ✅ Generate full URL using frontend base URL and slugs
          const frontendUrl = process.env.FRONTEND_URL || 'https://tokossmotors.com';
          fullCarUrl = `${frontendUrl}/cars-details/${inquiryDto.brandSlug}/${inquiryDto.modelSlug}/${carSlug}`;
          //carSlug = fullCarUrl; // use the full generated one

          console.log('✅ Full Car URL:', fullCarUrl);

        } else {
          console.warn('⚠️ No car found for slugs:', inquiryDto.brandSlug, inquiryDto.modelSlug);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.warn('⚠️ Could not fetch car for inquiry email:', err.message);
      } else {
        console.warn('⚠️ Unknown error fetching car:', err);
      }
    }

    await this.mailService.sendConfirmation({
      email: inquiryDto.email,
      name: inquiryDto.name,
      phone: inquiryDto.phone,
      destination: inquiryDto.destination,
      shippingDate: inquiryDto.shippingDate,
      brandSlug: inquiryDto.brandSlug,
      modelSlug: inquiryDto.modelSlug,
      fullCarUrl,
    });

    console.log('✅ Inquiry received:', inquiryDto);

    return {
      message: 'Inquiry submitted successfully',
      data: inquiry,
    };
  }
}
