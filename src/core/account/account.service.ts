import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Account } from '../../database/Model/Account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JsonResponse } from 'src/Utils/JsonResponse';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {}

    async authenticate(email: string, password: string): Promise<JsonResponse> {
        const account = await this.accountRepository.findOneBy({ email, password });

        return account ? JsonResponse.response(200, 'Authenticated', null) : JsonResponse.response(404, 'Unauthorized', null);
    }

    async findAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async findOne(id: number): Promise<Account | null> {
        return this.accountRepository.findOneBy({ id });
    }

    async create(account: Partial<Account>): Promise<Account> {
        const newAccount = this.accountRepository.create(account);
        return this.accountRepository.save(newAccount);
    }
}
