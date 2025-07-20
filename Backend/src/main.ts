import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as fs from 'fs';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';



dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


  // Enable CORS if you're running frontend and backend on different ports
  app.enableCors({
    origin: [
      'https://tokossmotors.com', 
      'https://www.tokossmotors.com', 
    ],
    methods: ['GET', 'POST','PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
  optionsSuccessStatus: 204
  });

  //app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
    const uploadPath = join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }


 
  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error if extra props exist
      transform: true,            // Auto-transform payloads (e.g. string to number)
      stopAtFirstError: true,
    }),
  );
 const PORT = process.env.PORT || 5000;
  await app.listen(PORT, '0.0.0.0');
 console.log(`🚀 Backend running on port ${PORT}`)

 mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected!');
});
}
bootstrap();
