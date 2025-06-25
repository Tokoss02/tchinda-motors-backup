import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password))  {
      
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

 

  async login(email: string, password: string) {
    // Your validation logic...
  
    const payload = { email };
    const token = this.jwtService.sign(payload);
    console.log('JWT Secret:', process.env.JWT_SECRET);
  
    return { access_token: token };
  }

  
}
