// src/auth/dto/verify-2fa.dto.ts
import { IsString } from 'class-validator';

export class Verify2FADto {
  @IsString()
  secret!: string;

  @IsString()
  token!: string;
}
