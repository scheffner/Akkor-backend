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
exports.S3Controller = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("./aws.service");
const adminGuard_1 = require("../guards/adminGuard");
let S3Controller = class S3Controller {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async uploadFile(file) {
        const bucketName = process.env.BUCKET_NAME;
        const uploadResult = await this.s3Service.uploadFile(file, bucketName);
        return uploadResult;
    }
    async deleteImage(imageName) {
        const bucketName = process.env.BUCKET_NAME;
        await this.s3Service.deleteImage(bucketName, imageName);
        return { message: 'Image deleted successfully' };
    }
};
exports.S3Controller = S3Controller;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(':imageName'),
    (0, common_1.UseGuards)(adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Param)('imageName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "deleteImage", null);
exports.S3Controller = S3Controller = __decorate([
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [aws_service_1.S3Service])
], S3Controller);
//# sourceMappingURL=aws.controller.js.map