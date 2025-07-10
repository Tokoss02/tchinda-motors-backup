// multerConfig.ts or similar
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
const uploadPath = path.join(process.cwd(), 'uploads', 'cars');

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


export const multerConfig: MulterOptions = {
  storage: multer.memoryStorage(), // ✅ Use memory storage for Cloudinary
  limits: {
    fileSize: 10 * 1024 * 1024, // ✅ Optional: 10MB max file size
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      cb(new Error('Only image files are allowed!'), false);
    } else {
      cb(null, true);
    }
  },
};

/*export const multerConfig = {
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
};*/
