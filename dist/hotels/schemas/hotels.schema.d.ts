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
export declare class Hotel {
    _id: string;
    name: string;
    description: string;
    location: string;
    images: string[];
    characteristics: boolean[];
    rooms: RoomInfo[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const HotelSchema: import("mongoose").Schema<Hotel, import("mongoose").Model<Hotel, any, any, any, import("mongoose").Document<unknown, any, Hotel> & Hotel & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Hotel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Hotel>> & import("mongoose").FlatRecord<Hotel> & Required<{
    _id: string;
}>>;
export interface RoomInfo {
    type: string;
    price: number;
    number: number;
}
