// multerConfig.ts or similar
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';

const uploadPath = path.join(process.cwd(), 'uploads', 'cars');

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

export const multerConfig = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadPath); // Absolute path
    },
    filename: (_req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      cb(new Error('Only image files are allowed!'), false);
    } else {
      cb(null, true);
    }
  },
};
