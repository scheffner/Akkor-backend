"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModule = void 0;
const common_1 = require("@nestjs/common");
const hotels_controller_1 = require("./hotels.controller");
const hotels_service_1 = require("./hotels.service");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const hotels_schema_1 = require("./schemas/hotels.schema");
const aws_module_1 = require("../aws/aws.module");
const config_1 = require("@nestjs/config");
let HotelModule = class HotelModule {
};
exports.HotelModule = HotelModule;
exports.HotelModule = HotelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Hotel', schema: hotels_schema_1.HotelSchema }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
            aws_module_1.AwsModule,
        ],
        controllers: [hotels_controller_1.HotelsController],
        providers: [hotels_service_1.HotelsService],
        exports: [hotels_service_1.HotelsService, mongoose_1.MongooseModule],
    })
], HotelModule);
//# sourceMappingURL=hotels.module.js.map