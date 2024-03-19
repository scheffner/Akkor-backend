import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password').exec();
    return users;
  }

  async create(createUser: User): Promise<string> {
    if (!createUser.email.includes('@')) {
      throw new InternalServerErrorException('Invalid email');
    }

    const user = await this.userModel.findOne({ username: createUser.username });
    if (user) {
      throw new InternalServerErrorException('Username already exists');
    }
    const createdUser = await this.userModel.create(createUser);

    const payload = {
      username: createdUser.username,
      sub: createdUser._id,
      role: createdUser.role,
    };
    const token = this.jwtService.sign(payload);

    return token
  }

  async findById(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).select('-password');
    } catch (error) {
      throw new InternalServerErrorException('Invalid ID');
    }

    // Error if user not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    const userDelete = await this.userModel.findByIdAndDelete(id);

    // Error if user not found
    if (!userDelete) {
      throw new NotFoundException('User not found');
    }

    return userDelete;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async generateJwt(user): Promise<string> {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return this.jwtService.sign(payload, { expiresIn: '2h' });
  }
}
