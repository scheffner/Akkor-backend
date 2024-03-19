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
exports.AwsConfigService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const config_1 = require("@nestjs/config");
let AwsConfigService = class AwsConfigService {
    constructor(configService) {
        this.configService = configService;
        const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        const region = this.configService.get('AWS_REGION');
        AWS.config.update({
            accessKeyId,
            secretAccessKey,
            region,
        });
    }
    getS3() {
        return new AWS.S3();
    }
};
exports.AwsConfigService = AwsConfigService;
exports.AwsConfigService = AwsConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsConfigService);
//# sourceMappingURL=aws-config.service.js.map