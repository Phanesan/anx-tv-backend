import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
    private minioClient: Minio.Client;

    constructor() {
        this.minioClient = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: 9000,
            useSSL: false,
            accessKey: process.env.MINIO_ACCESS_KEY || 'root',
            secretKey: process.env.MINIO_SECRET_KEY || 'root',
        });
    }

    async onModuleInit() {
        await this.healthCheck();
    }

    private async healthCheck() {
        try {
        await this.minioClient.listBuckets();
        console.log('✅ MinIO client connected successfully');
        } catch (error) {
        console.error('❌ MinIO connection error:', error);
        throw error;
        }
    }

    // Expone el cliente para usarlo en otros servicios
    getClient(): Minio.Client {
        return this.minioClient;
    }

    async uploadFile(bucketName: string, objectName: string, buffer: Buffer) {
        await this.minioClient.putObject(bucketName, objectName, buffer);
        return { bucketName, objectName };
    }
}
