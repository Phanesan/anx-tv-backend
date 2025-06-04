import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Account } from 'generated/prisma';
import { JsonResponse } from 'src/utils/JsonResponse';
import { Validate } from 'src/utils/Validates';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() data: Account) {
        const account = await this.authService.authenticate(data);
        
        const errors = Validate(account);

        if (errors.length > 0) throw new HttpException(errors, HttpStatus.BAD_REQUEST);

        return JsonResponse('Login successful', account);
    }
}
