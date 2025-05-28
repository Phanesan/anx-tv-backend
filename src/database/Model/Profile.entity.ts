import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './Account.entity';

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Account, account => account.id)
    @JoinColumn()
    accountId: Account;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column()
    channel_description: string;
}