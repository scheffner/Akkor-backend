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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_schema_1 = require("./schemas/user.schema");
const update_user_dto_1 = require("./dto/update-user.dto");
const bcrypt = require("bcrypt");
const login_dto_1 = require("./dto/login.dto");
const common_2 = require("@nestjs/common");
const employeOrAdminGuard_1 = require("../guards/employeOrAdminGuard");
const selfOrAdminGuard_1 = require("../guards/selfOrAdminGuard");
const selfGuard_1 = require("../guards/selfGuard");
const selfOrEmployeOrAdmin_1 = require("../guards/selfOrEmployeOrAdmin");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async create(createUser, res) {
        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        createUser.password = hashedPassword;
        const token = await this.usersService.create(createUser);
        res.cookie('token', token, { httpOnly: true });
        return token;
    }
    async findById(id) {
        return this.usersService.findById(id);
    }
    async updateById(id, user) {
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
        return this.usersService.updateById(id, user);
    }
    async deleteById(id) {
        return this.usersService.deleteById(id);
    }
    async login(loginUserDto, res) {
        const user = await this.usersService.validateUser(loginUserDto.username, loginUserDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException();
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
    async adminCheck() {
        return true;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/findAll'),
    (0, common_2.UseGuards)(employeOrAdminGuard_1.EmployeOrAdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_2.UseGuards)(selfOrEmployeOrAdmin_1.SelfOrEmployeOrAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_2.UseGuards)(selfOrAdminGuard_1.SelfOrAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_2.UseGuards)(selfGuard_1.SelfGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/protected'),
    (0, common_2.UseGuards)(employeOrAdminGuard_1.EmployeOrAdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "adminCheck", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map