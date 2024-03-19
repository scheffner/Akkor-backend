/// <reference types="multer" />
import * as AWS from 'aws-sdk';
export declare class S3Service {
    private s3;
    constructor();
    uploadFile(file: Express.Multer.File, bucketName: string): Promise<AWS.S3.ManagedUpload.SendData>;
    deleteImage(bucketName: string, objectKey: string): Promise<void>;
}
