import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Account } from './Account';
import { Serial } from './Serial';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class AccountSerial extends TimestampEntity {
	@PrimaryColumn('int8', { name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.accountIps, { nullable: false })
	account!: number;

	@PrimaryColumn({ type: 'char', length: 128, name: 'serialSerial' })
	@ManyToOne(() => Serial, (serial) => serial.accountSerial, { nullable: false })
	serial!: string;
}
