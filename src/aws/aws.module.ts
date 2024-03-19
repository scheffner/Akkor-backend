import { Module } from '@nestjs/common';
import { S3Service } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import { S3Controller } from './aws.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [S3Service],
  controllers: [S3Controller],
  exports: [S3Service],
})
export class AwsModule {}
