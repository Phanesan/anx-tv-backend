import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AccountService } from "./account.service";
import { Account } from "generated/prisma";
import { JsonResponse } from 'src/utils/JsonResponse';
import { Validate } from 'src/utils/Validates';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Get()
    async getAllAccounts(): Promise<Account[]> {
        return await this.accountService.getAllAccounts();
    }

    // TODO: Falta validar que el uuid exista
    @Get(':uuid')
    async getAccountByUuid(@Param('uuid') uuid: string): Promise<Account | null> {
        return await this.accountService.getAccountByUuid(uuid);
    }

    @Post()
    async createAccount(@Body() data: any): Promise<JsonResponse> {
        const account = await this.accountService.createAccount(data, data.username);

        const errors = Validate(account);

        if (errors.length > 0) throw new HttpException(errors, HttpStatus.BAD_REQUEST);

        return JsonResponse('Account created', account);
    }

    @Put(':uuid')
    async updateAccount(@Body() data: Account, @Param('uuid') uuid: string): Promise<JsonResponse> {
        const account = await this.accountService.updateAccount(data, uuid);

        const errors = Validate(account);

        if (errors.length > 0) throw new HttpException(errors, HttpStatus.BAD_REQUEST);

        return JsonResponse('Account updated', account);
    }

    // TODO: Falta validar que el account exista
    @Delete(':uuid')
    async deleteAccount(uuid: string): Promise<Account> {
        return await this.accountService.deleteAccount(uuid);
    }
}
