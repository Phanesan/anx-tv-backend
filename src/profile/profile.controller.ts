import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Get()
    async getProfiles() {
        return this.profileService.getProfiles();
    }

    @Get(':id')
    async getProfile(id: number) {
        return this.profileService.getProfile(id);
    }
}
