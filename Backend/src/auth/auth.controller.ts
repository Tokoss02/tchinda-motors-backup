import { Controller, Post, Body, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwoFactorService } from './two-factor.service';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private twoFactorService: TwoFactorService,
    private usersService: UsersService,
    private mailerService: MailerService,
  ) {}

  // Register user
  @Post('register')
  async register(@Body() body: { email: string; password: string; role: string  }) {
    const { email, password, role  } = body;

    // Set default role as 'user', but if role is 'admin', assign admin privileges
    const userRole = role === 'admin' ? 'admin' : 'user';

    // Register the user and return the result
    return await this.usersService.createUser(email, password, userRole);
  }

   // Admin password reset request
   @Post('admin/forgot-password')
   async adminForgotPassword(@Body('email') email: string) {
     const user = await this.usersService.findByEmail(email);
     if (!user || user.role !== 'admin') {
       throw new UnauthorizedException('Admin account not found');
     }
 
     const tempPassword = randomBytes(4).toString('hex');
     await this.usersService.updatePassword(user._id.toString(), tempPassword);
 
     await this.mailerService.sendMail({
       to: email,
       subject: 'Temporary Admin Password',
       text: `Here is your temporary password: ${tempPassword}. Please log in and reset it immediately.`,
     });
 
     return { message: 'Temporary password sent to your email.' };
   }


  // Login user
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Validate user credentials
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials'); // Throwing UnauthorizedException
    }

    // Check user role
    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied'); // Throwing ForbiddenException for non-admin users
    }


    // Check if 2FA is enabled
  if (user.isTwoFactorEnabled) {
    return {
      message: '2FA code required',
      email: user.email,
      twoFactorRequired: false,
    };
  }

    // Clean up the response (no password included)
    const { password: userPassword, ...userWithoutPassword } = user.toObject(); // Remove password from response
    const token = this.authService.login(email, password);
    return {
      message: 'Login successful',
      access_token: token,
      user: userWithoutPassword,
    };
  }

  // Setup 2FA
  @Post('2fa/setup')
  async setup2FA(@Body('email') email: string) {

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const { otpauth_url, base32 } = this.twoFactorService.generateSecret(email);
    const qr = await this.twoFactorService.generateQRCode(otpauth_url);

     // Save base32 secret and enable 2FA
    user.twoFactorSecret = base32;
    user.isTwoFactorEnabled = false;
    await user.save();
    
    // Save the base32 secret in the user DB in a real-world scenario
    return { message: '2FA setup successful', qrCode: qr, secret: base32 };
  }

  /* Verify 2FA code
  @Post('2fa/verify')
  verify2FA(@Body() body: Verify2FADto) {
    const { secret, token } = body;

    // Verify the 2FA code
    const isValid = this.twoFactorService.verifyCode(secret, token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code'); // Throwing UnauthorizedException for invalid code
    }

    return { message: '2FA code is valid' };
  }*/


      @Post('2fa/verify')
  async verify2FA(@Body() body: { email: string, token: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user || !user.twoFactorSecret) {
      throw new UnauthorizedException('User or 2FA secret not found');
    }

    const isValid = this.twoFactorService.verifyCode(user.twoFactorSecret, body.token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid 2FA code');
    }

    // Return JWT token
    const token = await this.authService.login(user.email, user.password);
    return {
      message: '2FA verification successful',
      access_token: token,
    };
  }

  @Post('user/forgot-password')
  async userForgotPassword(@Body('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.role !== 'user') {
      throw new UnauthorizedException('User not found');
    }

    return {
      message: 'Please contact an admin to reset your password.',
    };
  }

  @Post('admin/reset-user-password')
  async adminResetUserPassword(@Body() body: { email: string; newPassword: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user || user.role !== 'user') {
      throw new UnauthorizedException('User not found or not a regular user');
    }

    await this.usersService.updatePassword(user._id.toString(),body.newPassword);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Your password has been reset',
      text: `Your new password is: ${body.newPassword}`,
    });

    return { message: 'User password has been reset and emailed successfully' };
  }
}
