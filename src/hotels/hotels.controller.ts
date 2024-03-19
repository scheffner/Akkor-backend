import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { AdminGuard } from '../guards/adminGuard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multerConfig';
import { S3Service } from 'src/aws/aws.service';
import { Hotel, RoomInfo } from './schemas/hotels.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('hotels')
@Controller('hotels')
export class HotelsController {
  constructor(
    private hotelsService: HotelsService,
    private s3Service: S3Service,
  ) {}

  @Get('/findAll')
  async findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor('images', 10, multerConfig))
  async create(@UploadedFiles() images: Express.Multer.File[], @Body() body) {
    const createHotelDto = JSON.parse(body.hotelData);

    images.forEach((image) => {
      if (!image.buffer) {
        throw new Error(`Image buffer is missing: ${image.originalname}`);
      }
    });
    const bucketName = process.env.BUCKET_NAME;

    const uploadPromises = images.map((image) =>
      this.s3Service.uploadFile(image, bucketName),
    );
    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.Location);

    createHotelDto.images = imageUrls;

    return this.hotelsService.create(createHotelDto);
  }

  @Post('/:id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async addImageWhenUpdating(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!image) {
      throw new Error('No image uploaded');
    }

    const bucketName = process.env.BUCKET_NAME;
    const uploadResult = await this.s3Service.uploadFile(image, bucketName);
    const imageUrl = uploadResult.Location;

    return this.hotelsService.addImageWhenUpdating(id, imageUrl);
  }

  @Delete('/:id/:index')
  @UseGuards(AdminGuard)
  async deleteImageFromHotel(
    @Param('id') id: string,
    @Param('index') index: number,
  ): Promise<Hotel> {
    return this.hotelsService.findByIdAndDeleteImage(id, index);
  }

  @Get(':id')
  async findById(
    @Param('id')
    id: string,
  ): Promise<Hotel> {
    return this.hotelsService.findById(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateById(
    @Param('id')
    id: string,
    @Body()
    hotel: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelsService.updateById(id, hotel);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async deleteById(
    @Param('id')
    id: string,
  ): Promise<Hotel> {
    return this.hotelsService.deleteById(id);
  }

  @Get('/numberOfRooms/:id')
  async getNumberOfRooms(@Param('id') id: string): Promise<RoomInfo[]> {
    return this.hotelsService.getNumberOfRooms(id);
  }
}
