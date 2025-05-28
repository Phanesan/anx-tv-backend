import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProfileTable1748341152976 implements MigrationInterface {

    name = 'CreateProfileTable1748341152976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profile',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'account_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'channel_description',
                        type: 'varchar',
                        isNullable: false,
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
                    }
                ]
            }), true
        )

        await queryRunner.createForeignKey(
            'profile',
            new TableForeignKey({
                columnNames: ['account_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'account',
                onDelete: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('profile');
    }

}
