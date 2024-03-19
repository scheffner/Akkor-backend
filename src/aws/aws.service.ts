import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const { originalname, buffer } = file;

    const r = (Math.random() + 1).toString(36).substring(7);

    const uploadResult = await this.s3
      .upload({
        Bucket: bucketName,
        Key: r + '-' + originalname,
        Body: buffer,
      })
      .promise();

    return uploadResult;
  }

  async deleteImage(bucketName: string, objectKey: string): Promise<void> {
    const params = {
      Bucket: bucketName,
      Key: objectKey,
    };

    try {
      await this.s3.deleteObject(params).promise();
      console.log(`File deleted successfully: ${objectKey}`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
      throw error;
    }
  }
}
