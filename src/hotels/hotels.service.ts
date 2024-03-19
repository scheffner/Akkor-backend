import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Hotel, RoomInfo } from './schemas/hotels.schema';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: mongoose.Model<Hotel>,
  ) {}

  async findAll(): Promise<Hotel[]> {
    const hotels = await this.hotelModel.find().exec();
    return hotels;
  }

  async create(createHotel: Hotel): Promise<Hotel> {
    const createdHotel = await this.hotelModel.create(createHotel);
    return createdHotel;
  }

  async findById(id: string): Promise<Hotel> {
    let hotel;
    try {
      hotel = await this.hotelModel.findById(id);
    } catch (error) {
      throw new InternalServerErrorException('Invalid ID');
    }

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel;
  }

  async updateById(id: string, hotel: Hotel): Promise<Hotel> {
    return await this.hotelModel.findByIdAndUpdate(id, hotel, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Hotel> {
    const hotelToDelete = await this.hotelModel.findByIdAndDelete(id);

    if (!hotelToDelete) {
      throw new NotFoundException('Hotel not found');
    }

    return hotelToDelete;
  }

  async findByIdAndDeleteImage(id: string, index: number): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id);
    hotel.images.splice(index, 1);
    return await this.hotelModel.findByIdAndUpdate(id, hotel);
  }

  async addImageWhenUpdating(id: string, imageUrl: string): Promise<string> {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    hotel.images.push(imageUrl);
    await hotel.save();
    return imageUrl;
  }

  async getNumberOfRooms(id: string): Promise<RoomInfo[]> {
    console.log(id);
    const hotel = await this.hotelModel.findById(id);
    return hotel.rooms;
  }
}
