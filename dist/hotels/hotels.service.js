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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const hotels_schema_1 = require("./schemas/hotels.schema");
let HotelsService = class HotelsService {
    constructor(hotelModel) {
        this.hotelModel = hotelModel;
    }
    async findAll() {
        const hotels = await this.hotelModel.find().exec();
        return hotels;
    }
    async create(createHotel) {
        const createdHotel = await this.hotelModel.create(createHotel);
        return createdHotel;
    }
    async findById(id) {
        let hotel;
        try {
            hotel = await this.hotelModel.findById(id);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Invalid ID');
        }
        if (!hotel) {
            throw new common_1.NotFoundException('Hotel not found');
        }
        return hotel;
    }
    async updateById(id, hotel) {
        return await this.hotelModel.findByIdAndUpdate(id, hotel, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        const hotelToDelete = await this.hotelModel.findByIdAndDelete(id);
        if (!hotelToDelete) {
            throw new common_1.NotFoundException('Hotel not found');
        }
        return hotelToDelete;
    }
    async findByIdAndDeleteImage(id, index) {
        const hotel = await this.hotelModel.findById(id);
        hotel.images.splice(index, 1);
        return await this.hotelModel.findByIdAndUpdate(id, hotel);
    }
    async addImageWhenUpdating(id, imageUrl) {
        const hotel = await this.hotelModel.findById(id);
        if (!hotel) {
            throw new Error('Hotel not found');
        }
        hotel.images.push(imageUrl);
        await hotel.save();
        return imageUrl;
    }
    async getNumberOfRooms(id) {
        console.log(id);
        const hotel = await this.hotelModel.findById(id);
        return hotel.rooms;
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hotels_schema_1.Hotel.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map