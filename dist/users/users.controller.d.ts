import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    create(createUser: User, res: any): Promise<string>;
    findById(id: string): Promise<User>;
    updateById(id: string, user: UpdateUserDto): Promise<User>;
    deleteById(id: string): Promise<User>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<{
        token: string;
        username: string;
        email: string;
        role: string;
        id: string;
    }>;
    adminCheck(): Promise<boolean>;
}
