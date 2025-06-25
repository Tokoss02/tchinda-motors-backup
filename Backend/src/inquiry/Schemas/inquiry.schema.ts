// inquiry.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InquiryDocument = Inquiry & Document;

@Schema()
export class Inquiry {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop()
  destination!: string;

  @Prop()
  shippingDate!: string;

  @Prop()
  carId?: string;

  @Prop()
  carSlug?: string;

  @Prop()
  brandSlug?: string;

  @Prop()
  modelSlug?: string;


}

export const InquirySchema = SchemaFactory.createForClass(Inquiry);
