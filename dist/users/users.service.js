"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll() {
        const users = await this.userModel.find().select('-password').exec();
        return users;
    }
    async create(createUser) {
        if (!createUser.email.includes('@')) {
            throw new common_1.InternalServerErrorException('Invalid email');
        }
        const user = await this.userModel.findOne({ username: createUser.username });
        if (user) {
            throw new common_1.InternalServerErrorException('Username already exists');
        }
        const createdUser = await this.userModel.create(createUser);
        const payload = {
            username: createdUser.username,
            sub: createdUser._id,
            role: createdUser.role,
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
    async findById(id) {
        let user;
        try {
            user = await this.userModel.findById(id).select('-password');
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Invalid ID');
        }
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateById(id, user) {
        return await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        const userDelete = await this.userModel.findByIdAndDelete(id);
        if (!userDelete) {
            throw new common_1.NotFoundException('User not found');
        }
        return userDelete;
    }
    async validateUser(username, password) {
        const user = await this.userModel.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async generateJwt(user) {
        const payload = { username: user.username, sub: user._id, role: user.role };
        return this.jwtService.sign(payload, { expiresIn: '2h' });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose.Model, jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map