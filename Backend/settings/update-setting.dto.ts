// update-setting.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsOptional()
  @IsString()
  heading?: string;

  @IsOptional()
  @IsString()
  subheading?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  // Add other optional fields here if needed
}
