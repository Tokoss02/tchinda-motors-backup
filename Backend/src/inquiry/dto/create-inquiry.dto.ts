// create-inquiry.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateInquiryDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  phone!: string;

  @IsOptional()
  destination?: string;

  @IsOptional()
  @IsDateString()
  shippingDate?: string;

  @IsOptional()
  carSlug?: string;

  @IsOptional()
  brandSlug?: string;

  @IsOptional()
  modelSlug?: string;


}
