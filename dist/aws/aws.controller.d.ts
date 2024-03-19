/// <reference types="multer" />
import { S3Service } from './aws.service';
export declare class S3Controller {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    uploadFile(file: Express.Multer.File): Promise<import("aws-sdk/clients/s3").ManagedUpload.SendData>;
    deleteImage(imageName: string): Promise<{
        message: string;
    }>;
}
