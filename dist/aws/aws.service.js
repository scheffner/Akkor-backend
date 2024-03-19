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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = class S3Service {
    constructor() {
        this.s3 = new AWS.S3();
    }
    async uploadFile(file, bucketName) {
        const { originalname, buffer } = file;
        const r = (Math.random() + 1).toString(36).substring(7);
        const uploadResult = await this.s3
            .upload({
            Bucket: bucketName,
            Key: r + '-' + originalname,
            Body: buffer,
        })
            .promise();
        return uploadResult;
    }
    async deleteImage(bucketName, objectKey) {
        const params = {
            Bucket: bucketName,
            Key: objectKey,
        };
        try {
            await this.s3.deleteObject(params).promise();
            console.log(`File deleted successfully: ${objectKey}`);
        }
        catch (error) {
            console.error(`Error deleting file: ${error.message}`);
            throw error;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=aws.service.js.map