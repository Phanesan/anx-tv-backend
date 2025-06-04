import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [PrismaModule],
})
export class AccountModule {}
