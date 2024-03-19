import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './aws.service';
import { AdminGuard } from 'src/guards/adminGuard';

@Controller('images')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const bucketName = process.env.BUCKET_NAME;
    const uploadResult = await this.s3Service.uploadFile(file, bucketName);
    return uploadResult;
  }
  @Delete(':imageName')
  @UseGuards(AdminGuard)
  async deleteImage(@Param('imageName') imageName: string) {
    const bucketName = process.env.BUCKET_NAME;
    await this.s3Service.deleteImage(bucketName, imageName);
    return { message: 'Image deleted successfully' };
  }
}
