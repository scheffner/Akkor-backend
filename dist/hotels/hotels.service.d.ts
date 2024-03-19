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
import * as mongoose from 'mongoose';
import { Hotel, RoomInfo } from './schemas/hotels.schema';
export declare class HotelsService {
    private hotelModel;
    constructor(hotelModel: mongoose.Model<Hotel>);
    findAll(): Promise<Hotel[]>;
    create(createHotel: Hotel): Promise<Hotel>;
    findById(id: string): Promise<Hotel>;
    updateById(id: string, hotel: Hotel): Promise<Hotel>;
    deleteById(id: string): Promise<Hotel>;
    findByIdAndDeleteImage(id: string, index: number): Promise<Hotel>;
    addImageWhenUpdating(id: string, imageUrl: string): Promise<string>;
    getNumberOfRooms(id: string): Promise<RoomInfo[]>;
}
