export class CreateSettingDto {
  readonly page!: string;
  readonly section!: string;
  readonly lang?: string;
  readonly heading?: string;
  readonly subheading?: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly videoUrl?: string;
  readonly type?: 'image' | 'video' | 'text';
}