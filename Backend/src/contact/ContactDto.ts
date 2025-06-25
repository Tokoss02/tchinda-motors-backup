import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ContactDto {
  @IsNotEmpty() 
  @IsString() 
  firstName!: string;

  @IsNotEmpty() 
  @IsString() 
  lastName!: string;

  @IsEmail() 
  email!: string;

  @IsString() 
  phone?: string;
  
  @IsNotEmpty() 
  message!: string;
}
