/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ReservationsService } from './reservations.service';
import { JwtService } from '@nestjs/jwt';
import { Reservation } from './schemas/reservations.schema';
import { HotelsService } from 'src/hotels/hotels.service';
export declare class ReservationsController {
    private readonly reservationsService;
    private readonly hotelSercice;
    private jwtService;
    constructor(reservationsService: ReservationsService, hotelSercice: HotelsService, jwtService: JwtService);
    create(req: Request, createReservation: Reservation): Promise<import("mongoose").Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>>;
    findAll(): Promise<Reservation[]>;
    findAllUserReservations(req: Request): Promise<Reservation[]>;
    checkAvailableRooms(body: {
        arrivalDate: string;
        departureDate: string;
        hotelId: string;
    }): Promise<object>;
    findOne(req: Request, id: string): Promise<import("mongoose").Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>>;
    remove(req: Request, id: string): Promise<import("mongoose").Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>>;
}
