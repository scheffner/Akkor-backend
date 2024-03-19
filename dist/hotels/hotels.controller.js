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
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const hotels_service_1 = require("./hotels.service");
const update_hotel_dto_1 = require("./dto/update-hotel.dto");
const adminGuard_1 = require("../guards/adminGuard");
const platform_express_1 = require("@nestjs/platform-express");
const multerConfig_1 = require("./multerConfig");
const aws_service_1 = require("../aws/aws.service");
const swagger_1 = require("@nestjs/swagger");
let HotelsController = class HotelsController {
    constructor(hotelsService, s3Service) {
        this.hotelsService = hotelsService;
        this.s3Service = s3Service;
    }
    async findAll() {
        return this.hotelsService.findAll();
    }
    async create(images, body) {
        const createHotelDto = JSON.parse(body.hotelData);
        images.forEach((image) => {
            if (!image.buffer) {
                throw new Error(`Image buffer is missing: ${image.originalname}`);
            }
        });
        const bucketName = process.env.BUCKET_NAME;
        const uploadPromises = images.map((image) => this.s3Service.uploadFile(image, bucketName));
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map((result) => result.Location);
        createHotelDto.images = imageUrls;
        return this.hotelsService.create(createHotelDto);
    }
    async addImageWhenUpdating(image, id) {
        if (!image) {
            throw new Error('No image uploaded');
        }
        const bucketName = process.env.BUCKET_NAME;
        const uploadResult = await this.s3Service.uploadFile(image, bucketName);
        const imageUrl = uploadResult.Location;
        return this.hotelsService.addImageWhenUpdating(id, imageUrl);
    }
    async deleteImageFromHotel(id, index) {
        return this.hotelsService.findByIdAndDeleteImage(id, index);
    }
    async findById(id) {
        return this.hotelsService.findById(id);
    }
    async updateById(id, hotel) {
        return this.hotelsService.updateById(id, hotel);
    }
    async deleteById(id) {
        return this.hotelsService.deleteById(id);
    }
    async getNumberOfRooms(id) {
        return this.hotelsService.getNumberOfRooms(id);
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, common_1.Get)('/findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(adminGuard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, multerConfig_1.multerConfig)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/:id'),
    (0, common_1.UseGuards)(adminGuard_1.AdminGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multerConfig_1.multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "addImageWhenUpdating", null);
__decorate([
    (0, common_1.Delete)('/:id/:index'),
    (0, common_1.UseGuards)(adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "deleteImageFromHotel", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_dto_1.UpdateHotelDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(adminGuard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Get)('/numberOfRooms/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getNumberOfRooms", null);
exports.HotelsController = HotelsController = __decorate([
    (0, swagger_1.ApiTags)('hotels'),
    (0, common_1.Controller)('hotels'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService,
        aws_service_1.S3Service])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map