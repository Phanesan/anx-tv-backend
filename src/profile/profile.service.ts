import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) {}

    async getProfiles() {
        return this.prisma.profile.findMany({});
    }

    async getProfile(id: number) {
        return this.prisma.profile.findUnique({ where: { id } });
    }
}
