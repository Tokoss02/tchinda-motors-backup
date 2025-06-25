// types/setting.ts

export interface Setting {
  _id: string;
  page: string;
  section: string;
  lang?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  type?: 'image' | 'video' | 'text';
  createdAt?: string;
  updatedAt?: string;
}
