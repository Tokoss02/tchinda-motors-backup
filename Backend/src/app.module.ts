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
import { EmailController } from './email/email.controller';  // Import EmailController
import { EmailModule } from './email/email.module'; // Add this import
import { InquiryModule } from './inquiry/inquiry.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';



@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // JWT config (move secret to env for security)
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),

    ServeStaticModule.forRoot({
       rootPath: join(process.cwd(), 'uploads'),
       serveRoot: '/uploads',
     }),

    // Serve /uploads statically (e.g. for images)
    /*ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),*/


    // Connect to MongoDB (can override with DATABASE_URL env var)
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb+srv://tokossmotors:52rbrR0iCSPRTDaw@cluster0.8ekmrcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

      {
        dbName: process.env.DATABASE_NAME || 'tokoss-db',
      },
    ),
    CloudinaryModule,
    EmailModule,
    UsersModule,
    AuthModule,
    CarModule,
    InquiryModule,
  ],

  controllers: [AppController, CarController, AuthController, EmailController], // Register AppController here
  providers: [AppService, AuthService, TwoFactorService],      // Register AppService
})
export class AppModule { }
