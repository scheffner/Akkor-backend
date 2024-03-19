import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';
import { UseGuards } from '@nestjs/common';
import { EmployeOrAdminGuard } from '../guards/employeOrAdminGuard';
import { SelfOrAdminGuard } from '../guards/selfOrAdminGuard';
import { SelfGuard } from '../guards/selfGuard';
import { SelfOrEmployeOrAdminGuard } from '../guards/selfOrEmployeOrAdmin';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/findAll')
  @UseGuards(EmployeOrAdminGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(
    @Body()
    createUser: User,
    @Res({ passthrough: true }) res
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    createUser.password = hashedPassword;
    const token = await this.usersService.create(createUser);
    res.cookie('token', token, { httpOnly: true });
    return token;
  }

  @Get(':id')
  @UseGuards(SelfOrEmployeOrAdminGuard)
  async findById(
    @Param('id')
    id: string
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(SelfOrAdminGuard)
  async updateById(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto
  ): Promise<User> {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    return this.usersService.updateById(id, user);
  }

  @Delete(':id')
  @UseGuards(SelfGuard)
  async deleteById(
    @Param('id')
    id: string
  ): Promise<User> {
    return this.usersService.deleteById(id);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{
    token: string;
    username: string;
    email: string;
    role: string;
    id: string;
  }> {
    const user = await this.usersService.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.usersService.generateJwt(user);
    res.cookie('token', token, { httpOnly: true });
    return {
      id: user._id.toString(),
      token,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
