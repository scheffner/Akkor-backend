import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
export declare class AwsConfigService {
    private configService;
    constructor(configService: ConfigService);
    getS3(): AWS.S3;
}
