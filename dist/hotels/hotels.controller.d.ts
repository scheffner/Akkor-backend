/// <reference types="multer" />
import { HotelsService } from './hotels.service';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { S3Service } from 'src/aws/aws.service';
import { Hotel, RoomInfo } from './schemas/hotels.schema';
export declare class HotelsController {
    private hotelsService;
    private s3Service;
    constructor(hotelsService: HotelsService, s3Service: S3Service);
    findAll(): Promise<Hotel[]>;
    create(images: Express.Multer.File[], body: any): Promise<Hotel>;
    addImageWhenUpdating(image: Express.Multer.File, id: string): Promise<string>;
    deleteImageFromHotel(id: string, index: number): Promise<Hotel>;
    findById(id: string): Promise<Hotel>;
    updateById(id: string, hotel: UpdateHotelDto): Promise<Hotel>;
    deleteById(id: string): Promise<Hotel>;
    getNumberOfRooms(id: string): Promise<RoomInfo[]>;
}
