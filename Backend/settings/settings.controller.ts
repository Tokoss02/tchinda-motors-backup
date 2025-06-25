import { Controller, Get, Param, Patch, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './create-setting.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateSettingDto } from './update-setting.dto';


@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get(':page/:section')
  getSetting(
    @Param('page') page: string,
    @Param('section') section: string,
    @Query('lang') lang: string,
  ) {
    return this.settingsService.getSetting(page, section, lang);
  }

 @Patch(':id')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/settings',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }),
)
async updateSetting(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any,
) {
  if (file) {
    body.imageUrl = `/uploads/settings/${file.filename}`;
  }
  return this.settingsService.update(id, body);
}

  @Get('pages/all')
  getPages() {
    return this.settingsService.getPages();
  }
}