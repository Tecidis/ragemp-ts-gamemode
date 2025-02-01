import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { AccountSerial } from './AccountSerial';
import { TimestampEntity } from './TimestampEntity';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Serial extends TimestampEntity {
	@PrimaryColumn({ type: 'varchar', length: 128 })
	id!: string;

	@OneToMany(() => AccountSerial, (accountSerial) => accountSerial.serial)
	accountSerials?: AccountSerial[] | number[];

	constructor(id: string) {
		super();
		this.id = id;
	}
}
