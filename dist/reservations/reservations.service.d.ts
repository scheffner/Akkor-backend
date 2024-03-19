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
/// <reference types="mongoose/types/inferschematype" />
import mongoose from 'mongoose';
import { Reservation } from './schemas/reservations.schema';
export declare class ReservationsService {
    private reservationModel;
    constructor(reservationModel: mongoose.Model<Reservation>);
    create(createdReservation: Reservation): Promise<mongoose.Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>>;
    findAll(): Promise<(mongoose.Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>)[]>;
    findAllUserReservations(userId: string): Promise<(mongoose.Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>)[]>;
    findOne(id: string, userId: string): Promise<mongoose.Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>>;
    remove(id: string, userId: string): Promise<mongoose.Document<unknown, {}, Reservation> & Reservation & Required<{
        _id: string;
    }>>;
    checkOccupiedRooms(arrivalDate: Date, departureDate: Date, hotelId: string): Promise<Record<string, number>>;
}
