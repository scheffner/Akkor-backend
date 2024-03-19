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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reservations_schema_1 = require("./schemas/reservations.schema");
let ReservationsService = class ReservationsService {
    constructor(reservationModel) {
        this.reservationModel = reservationModel;
    }
    async create(createdReservation) {
        const createdReservations = await this.reservationModel.create(createdReservation);
        return createdReservations;
    }
    async findAll() {
        const reservations = await this.reservationModel.find().exec();
        return reservations;
    }
    async findAllUserReservations(userId) {
        return await this.reservationModel.find({ userId: userId }).exec();
    }
    async findOne(id, userId) {
        const reservation = await this.reservationModel.findById(id);
        if (reservation.userId !== userId) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        if (!reservation) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        return reservation;
    }
    async remove(id, userId) {
        const reservation = await this.reservationModel.findById(id);
        if (reservation.userId !== userId) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        const reservationToDelete = await this.reservationModel.findByIdAndDelete(id);
        if (!reservationToDelete) {
            throw new common_1.NotFoundException('Reservation not found');
        }
        return reservationToDelete;
    }
    async checkOccupiedRooms(arrivalDate, departureDate, hotelId) {
        const reservations = await this.reservationModel.find({
            hotelId: hotelId,
            $or: [
                {
                    checkIn: { $gte: arrivalDate },
                    checkOut: { $lte: departureDate },
                },
            ],
        });
        const calculateTotalRoomsByType = (reservations) => {
            return reservations.reduce((acc, reservation) => {
                reservation.rooms.forEach((room) => {
                    if (acc[room.type]) {
                        acc[room.type] += room.number;
                    }
                    else {
                        acc[room.type] = room.number;
                    }
                });
                return acc;
            }, {});
        };
        const roomsBooked = calculateTotalRoomsByType(reservations);
        return roomsBooked;
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reservations_schema_1.Reservation.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map