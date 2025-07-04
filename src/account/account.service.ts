import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Account } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AccountService {
    constructor(private prisma: PrismaService) {}

    async getAllAccounts(): Promise<Account[]> {
        return await this.prisma.account.findMany();
    }
    
    async getAccountByUuid(uuid: string): Promise<Account | null> {
        return await this.prisma.account.findUnique({ where: { uuid } });
    }

    async createAccount(data: any, username: string): Promise<Account | number[]> {
        let errorsCode: number[] = [];
        let response;

        // Validate data exists
        if (!data.email) errorsCode.push(0);
        if (!data.password) errorsCode.push(1);

        if( errorsCode.length > 0 ) return errorsCode;

        // Check if account already exists
        const existingAccount = await this.prisma.account.findUnique({ where: { email: data.email } });
        if (existingAccount) throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);

        await this.prisma.$transaction(async (prisma) => {
            // Hash password
            data.password = await bcrypt.hash(data.password, 10);
            
            response = await this.prisma.account.create({
                data: {
                    email: data.email,
                    password: data.password,
                }
            })

            // Create profile
            await this.prisma.profile.create({ data: { 
                accountUuid: response.uuid,
                username: username,
                channel_description: 'Default description',
            } });
        })

        return response;
    }

    async updateAccount(data: Account, uuid: string): Promise<Account | number[]> {
        let errorsCode: number[] = [];

        // Validate data exists
        if (!data.email) errorsCode.push(0);
        if (!data.password) errorsCode.push(1);

        if( errorsCode.length > 0 ) return errorsCode;

        // Check if account already exists
        const existingAccount = await this.prisma.account.findUnique({ where: { uuid: uuid } });
        if (existingAccount) {
            data.password = await bcrypt.hash(data.password, 10);

            return await this.prisma.account.update({ where: { uuid: uuid }, data });
        }

        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    async deleteAccount(uuid: string): Promise<Account> {
        return await this.prisma.account.delete({ where: { uuid } });
    }
}
