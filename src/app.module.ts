import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { VideoModule } from './video/video.module';
import { MinioModule } from './minio/minio.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, AccountModule, AuthModule, VideoModule, MinioModule, ProfileModule],
  exports: [],
  providers: [],
  controllers: [],
})
export class AppModule {}
