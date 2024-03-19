export class CreateReservationDto {
  userId: string;
  hotelId: string;
  hotelName: string;
  rooms: object[];
  price: number;
  checkIn: string;
  checkOut: string;
  createdAt: Date;
  updatedAt: Date;
}
