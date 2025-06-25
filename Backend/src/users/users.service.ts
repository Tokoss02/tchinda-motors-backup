import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  findById(id: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}  

  // Create new user with hashed password
  async createUser(email: string, password: string, role: string): Promise<any> {

     // Check if user already exists
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        return {
          message: 'Email is already registered',
          success: false,
        };
      }
     // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const createdUser = new this.userModel({ email, password: hashedPassword, role });
    const savedUser = await createdUser.save();
  
    // Remove password from the returned object
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    
    return {
      user: {
        message: 'User registered successfully',
        success: true,
        user: userWithoutPassword,
        createdAt: savedUser.createdAt || new Date()
      }
    };
    
  }

  // Find a user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Validate user credentials
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if(!user || !user.password || !password) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null; // Incorrect password

    return user; // Return user if credentials are valid
  }

  //update password
  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword });
  }

  async setResetToken(email: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Admin user not found or invalid role');
    }

    const resetToken = uuidv4();
    const resetTokenExpires = new Date(Date.now() + 3600 * 1000); // 1 hour expiry

    await this.userModel.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpires,
    });

    return resetToken;
  }

  async resetPasswordWithToken(token: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });

    return true;
  }


}
