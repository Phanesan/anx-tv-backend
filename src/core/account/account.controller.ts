import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/database/Model/Account.entity';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Get()
    findAll() {
        return this.accountService.findAll();
    }

    @Get(':id')
    findOne(id: number) {
        return this.accountService.findOne(id);
    }

    @Post()
    create(@Body() account: Account) {
        return this.accountService.create(account);
    }

    @Post('/auth')
    auth(@Body() account: Account) {
        return this.accountService.authenticate(account.email, account.password);
    }
}
