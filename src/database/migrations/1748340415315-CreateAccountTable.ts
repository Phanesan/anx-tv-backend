import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountTable1748340415315 implements MigrationInterface {

    name = 'CreateAccountTable1748340415315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'account',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        isNullable: false,
                        type: 'varchar',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                ],
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('account');
    }

}
