import { Controller } from '@nestjs/common';
import { MinioService } from 'src/minio/minio.service';

@Controller('video')
export class VideoController {
    constructor(private minioService: MinioService) {}

    
}
