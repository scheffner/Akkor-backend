import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Reservation {
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  hotelId: string;

  @Prop()
  hotelName: string;

  @Prop()
  rooms: object[];

  @Prop()
  price: number;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
