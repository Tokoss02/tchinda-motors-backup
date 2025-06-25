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



@Module({
  imports: [

    JwtModule.register({
      secret: 'your-secret-key',  // You can store this in an environment variable for better security
      signOptions: { expiresIn: '30d' },
    }),

   /*ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),*/
    

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 👈 make sure this matches your file structure
      serveRoot: '/uploads',                      // URL prefix
    }),

    ConfigModule.forRoot({
      isGlobal: true, // <== make sure this is set!
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb+srv://tokossmotors:52rbrR0iCSPRTDaw@cluster0.8ekmrcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    EmailModule,
    UsersModule,
    AuthModule,
    CarModule,
    InquiryModule,
  ],

  controllers: [AppController, CarController, AuthController, EmailController], // Register AppController here
  providers: [AppService, AuthService, TwoFactorService],      // Register AppService
})
export class AppModule {}
