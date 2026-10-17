import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarController } from './cars/car.controller';
import { CarModule } from './cars/car.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TwoFactorService } from './auth/two-factor.service';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // JWT config
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),

    // Serve uploads statically
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    // Connect to MongoDB
    // First log URI for debugging
    // (safe if you don’t log passwords in production)
    ...(console.log('Mongo URI:', process.env.MONGODB_URI), []),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),

    CloudinaryModule,
    EmailModule,
    UsersModule,
    AuthModule,
    CarModule,
    InquiryModule,
  ],

  controllers: [
    AppController,
    CarController,
    AuthController,
    EmailController,
  ],
  providers: [AppService, AuthService, TwoFactorService],
})
export class AppModule {}
