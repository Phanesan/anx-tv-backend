import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Minio from 'minio';
import * as fs from 'fs';
import { Readable } from 'stream';

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
            partSize: 10 * 1024 * 1024
        });
    }

    async onModuleInit() {
        await this.healthCheck();

        // Bucket initialization
        const exist = await this.minioClient.bucketExists('videos');
        if (!exist) {
            await this.minioClient.makeBucket('videos');
            await this.minioClient.setBucketPolicy('videos', JSON.stringify({
                "Version": "2012-10-17",
                "Statement": [
                    {
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": ["s3:GetObject"],
                    "Resource": ["arn:aws:s3:::videos/*"]
                    }
                ]
            }))
        }
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

    getFileUrl(objectName: string): string {
        objectName = objectName.replace(/_/g, '/');
        return `http://${process.env.URL_BASE}:${process.env.MINIO_PORT}/videos/${objectName}.mp4`;
    }

    getFileThumbnailUrl(objectName: string): string {
        objectName = objectName.replace(/_/g, '/');
        return `http://${process.env.URL_BASE}:${process.env.MINIO_PORT}/videos/${objectName}.png`;
    }

    async uploadVideo(
        file: Express.Multer.File,
        bucketName: string,
    ): Promise<string> {
        const objectName = `uploads/${crypto.randomUUID()}`;

        await this.minioClient.putObject(
            bucketName,
            `${objectName}.mp4`,
            file.buffer,
            file.size,
            {
                'Content-Type': file.mimetype,
            },
        );

        return this.getFileUrl(objectName);
    }

    async uploadThumbnail(file: Express.Multer.File, bucketName: string): Promise<string> {
        const objectName = `thumbnails/${crypto.randomUUID()}`;

        await this.minioClient.putObject(
            bucketName,
            `${objectName}.png`,
            file.buffer,
            file.size,
            {
                'Content-Type': file.mimetype,
            },
        );
    
        return this.getFileThumbnailUrl(objectName);
    }
}
