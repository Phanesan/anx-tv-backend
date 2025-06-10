import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [PrismaModule, MinioModule],
})
export class VideoModule {}
