import { RoomInfo } from '../schemas/hotels.schema';

export class UpdateHotelDto {
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
