import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { JsonResponse } from 'src/utils/JsonResponse';

@Controller('video')
export class VideoController {
    constructor(private videoService: VideoService) {}

    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ]))
    async uploadVideo(
        @Body() body: any,
        @UploadedFiles() files: { file: Express.Multer.File, thumbnail: Express.Multer.File }
    ) {
        return JsonResponse('Video uploaded', {
            data: await this.videoService.uploadVideo(files.file[0], files.thumbnail[0], body),
        });
    }

    @Get('url/:objectName')
    async getVideoUrl(@Param('objectName') objectName: string) {
        return JsonResponse('Video URL', {
            url: await this.videoService.getVideoUrl(objectName),
        });
    }

    @Get('get-all')
    async getAllVideos() {
        return JsonResponse('All videos', {
            data: await this.videoService.getAllVideos(),
        });
    }
}
