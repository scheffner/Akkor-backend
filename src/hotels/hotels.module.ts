import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { HotelSchema } from './schemas/hotels.schema';
import { AwsModule } from 'src/aws/aws.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AwsModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService, MongooseModule],
})
export class HotelModule {}
