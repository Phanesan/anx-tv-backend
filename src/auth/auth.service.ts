import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async authenticate(data: Account): Promise<Account | number[]> {
        let errorsCode: number[] = [];

        // Validate data exists
        if (!data.email) errorsCode.push(0);
        if (!data.password) errorsCode.push(1);

        if (errorsCode.length > 0) return errorsCode;

        const existingAccount = await this.prisma.account.findUnique({ where: { email: data.email } });
        if (existingAccount) {
            const isPasswordValid = await bcrypt.compare(data.password, existingAccount.password);
            if (isPasswordValid) return existingAccount;
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
}
