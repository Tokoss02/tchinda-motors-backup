import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './settings.schema';
import { CreateSettingDto } from './create-setting.dto';
import { UpdateSettingDto } from './update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Setting.name) private settingModel: Model<SettingDocument>) {}

  async update(id: string, updateData: UpdateSettingDto): Promise<Setting> {
    const updated = await this.settingModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException(`Setting with id ${id} not found`);
    }
    return updated;
  }


  async getSetting(page: string, section: string, lang = 'en') {
    return this.settingModel.findOne({ page, section, lang });
  }

  async updateSetting(id: string, updateData: Partial<CreateSettingDto>) {
    return this.settingModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async getPages() {
    return this.settingModel.distinct('page');
  }
}