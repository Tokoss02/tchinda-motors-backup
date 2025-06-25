import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema({ timestamps: true })
export class Setting {
  @Prop({ required: true }) page!: string;       // e.g., "home", "about"
  @Prop({ required: true }) section!: string;    // e.g., "header", "footer"
  @Prop() lang?: string;                        // e.g., "en", "fr"

  @Prop() heading?: string;
  @Prop() subheading?: string;
  @Prop() description?: string;
  
  @Prop() imageUrl?: string;
  @Prop() videoUrl?: string;
  @Prop() type?: 'image' | 'video' | 'text';
}

export const SettingSchema = SchemaFactory.createForClass(Setting);