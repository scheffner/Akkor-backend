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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const jwt_1 = require("@nestjs/jwt");
const reservations_schema_1 = require("./schemas/reservations.schema");
const employeOrAdminGuard_1 = require("../guards/employeOrAdminGuard");
const swagger_1 = require("@nestjs/swagger");
const hotels_service_1 = require("../hotels/hotels.service");
let ReservationsController = class ReservationsController {
    constructor(reservationsService, hotelSercice, jwtService) {
        this.reservationsService = reservationsService;
        this.hotelSercice = hotelSercice;
        this.jwtService = jwtService;
    }
    create(req, createReservation) {
        const token = req.headers.authorization?.split(' ')[1];
        const payload = this.jwtService.verify(token);
        const userId = payload.sub;
        createReservation.userId = userId;
        return this.reservationsService.create(createReservation);
    }
    findAll() {
        return this.reservationsService.findAll();
    }
    findAllUserReservations(req) {
        const token = req.headers.authorization?.split(' ')[1];
        const payload = this.jwtService.verify(token);
        const userId = payload.sub;
        return this.reservationsService.findAllUserReservations(userId);
    }
    async checkAvailableRooms(body) {
        const { arrivalDate, departureDate, hotelId } = body;
        const queryStartDate = new Date(arrivalDate);
        const queryEndDate = new Date(departureDate);
        const roomsOfHotel = await this.hotelSercice.getNumberOfRooms(hotelId);
        const checkOccupiedRooms = await this.reservationsService.checkOccupiedRooms(queryStartDate, queryEndDate, hotelId);
        const availableRooms = roomsOfHotel.reduce((acc, item) => {
            const occupied = checkOccupiedRooms[item.type] || 0;
            acc[item.type] = item.number - occupied;
            return acc;
        }, {});
        console.log(availableRooms);
        return availableRooms;
    }
    findOne(req, id) {
        const token = req.headers.authorization?.split(' ')[1];
        const payload = this.jwtService.verify(token);
        const userId = payload.sub;
        return this.reservationsService.findOne(id, userId);
    }
    remove(req, id) {
        const token = req.headers.authorization?.split(' ')[1];
        const payload = this.jwtService.verify(token);
        const userId = payload.sub;
        return this.reservationsService.remove(id, userId);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, reservations_schema_1.Reservation]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/findAll'),
    (0, common_1.UseGuards)(employeOrAdminGuard_1.EmployeOrAdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/reservationsByUser'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findAllUserReservations", null);
__decorate([
    (0, common_1.Post)('/checkAvailableRooms/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "checkAvailableRooms", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "remove", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, swagger_1.ApiTags)('reservations'),
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService,
        hotels_service_1.HotelsService,
        jwt_1.JwtService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map