/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: mongoose.Model<User>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    create(createUser: User): Promise<string>;
    findById(id: string): Promise<User>;
    updateById(id: string, user: User): Promise<User>;
    deleteById(id: string): Promise<User>;
    validateUser(username: string, password: string): Promise<User>;
    generateJwt(user: any): Promise<string>;
}
