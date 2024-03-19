import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Hotel {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  images: string[];

  @Prop()
  characteristics: boolean[];

  @Prop()
  rooms: RoomInfo[];

  createdAt: Date;
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

export interface RoomInfo {
  type: string;
  price: number;
  number: number;
}
