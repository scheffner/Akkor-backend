export class CreateHotelDto {
  name: string;
  description: string;
  location: string;
  images: string[];
  characteristics: boolean[];
  rooms: object[];
  createdAt: Date;
  updatedAt: Date;
}
