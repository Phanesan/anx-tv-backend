import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MinioService } from 'src/minio/minio.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
    constructor(private minioService: MinioService, private prisma: PrismaService) {}

    async uploadVideo(file: Express.Multer.File, thumbnail: Express.Multer.File, body: any): Promise<any> {
        if (!file) throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
        if (!thumbnail) throw new HttpException('No thumbnail uploaded', HttpStatus.BAD_REQUEST);

        let urlVideo;
        let thumbnailPath;

        await this.prisma.$transaction(async (prisma) => {

            urlVideo = await this.minioService.uploadVideo(file, 'videos')
            thumbnailPath = await this.minioService.uploadThumbnail(thumbnail, 'videos');

            await prisma.metadata.create({ data: {
                profileId: Number(body.profileId),
                title: body.title,
                description: body.description,
                state: Number(body.state) === 0 ? 'PUBLIC' : 'PRIVATE', // 0: public, 1: private
                publishDate: new Date(),
                video_path: urlVideo,
                thumbnail_path: thumbnailPath
            }})
            
        });

        return {
            url: urlVideo,
            thumbnail: thumbnailPath
        };
    }

    async getVideoUrl(objectName: string): Promise<string> {
        return this.minioService.getFileUrl(objectName);
    }

    async getAllVideos(): Promise<any> {
        const data = await this.prisma.metadata.findMany({ include : { profile: true }});
        return data;
    }
}
