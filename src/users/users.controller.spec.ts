/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService, JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
            secret: 'dqzdq!&FKODQJKLvEIRJ',
            signOptions: { expiresIn: '60m' },
        }),
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {}, 
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all users', async () => {
    const result: User[] = [];
    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
    expect(await controller.findAll()).toBe(result);
  });

  it('should create a user', async () => {
    const user: User = { 
      _id: '1',
      username: 'test',
      password: 'test',
      email: 'test@gmail.com',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const res = {
      cookie: jest.fn(),
    };

    jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve('test_token'));
    expect(await controller.create(user, res)).toStrictEqual('test_token');
    expect(res.cookie).toHaveBeenCalledWith('token', 'test_token', { httpOnly: true });

  });

  it('should not create a user, not valid email', async () => {
    const user: User = { 
      _id: '1',
      username: 'test',
      password: 'test',
      email: 'test',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    jest.spyOn(service, 'create').mockImplementation(() => Promise.reject(new Error('Invalid email')));
    await expect(controller.create(user, null)).rejects.toThrow('Invalid email');
  });

  it('should not create a user, username already exists', async () => {
    const user: User = { 
      _id: '1',
      username: 'test',
      password: 'test',
      email: 'test',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    jest.spyOn(service, 'create').mockImplementation(() => Promise.reject(new Error('Username already exists')));
    await expect(controller.create(user, null)).rejects.toThrow('Username already exists');
  });

  it('should get a user by id', async () => {
    const user: User = { 
      _id: '1',
      username: 'test',
      password: 'test',
      email: 'test',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(user));
    expect(await controller.findById('1')).toBe(user);
  });

  it('should update a user by id', async () => {
    const user: User = { 
      _id: '1',
      username: 'test',
      password: 'test',
      email: 'test',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updateUserDto: UpdateUserDto = { 
      _id: '1',
      username: 'Changement de nom',
      password: 'test',
      email: 'test',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
     };
    jest.spyOn(service, 'updateById').mockImplementation(() => Promise.resolve(user));
    expect(await controller.updateById('1', updateUserDto)).toBe(user);
  });

  it('should delete a user by id', async () => {
    const user: User = { 
      _id: '1',
      username: 'test',
      password: 'test',
      email: 'test',
      role: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
     };
    jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve(user));
    expect(await controller.deleteById('1')).toBe(user);
  });
});