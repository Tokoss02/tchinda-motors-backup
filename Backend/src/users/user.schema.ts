import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';


@Schema({ timestamps: true }) // ✅ Adds createdAt and updatedAt automatically
  
export class User {
  toObject(): { [x: string]: any; password: any; } {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
  
  @Prop({ default: 'user' }) // Roles: admin, user
  role!: string;

  @Prop({ default: false })
  isTwoFactorEnabled!: boolean; // 2FA Feature

  @Prop()
  twoFactorSecret?: string; // 🔐 Store secret for each user 


}

// ✅ Extend UserDocument with timestamps
export type UserDocument = User & Document & {
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  role: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  _id: ObjectId;  // Make sure _id is typed as ObjectId
};




export const UserSchema = SchemaFactory.createForClass(User);
