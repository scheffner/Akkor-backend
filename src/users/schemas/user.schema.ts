import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  createdAt: Date;
  updatedAt: Date;
  _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
