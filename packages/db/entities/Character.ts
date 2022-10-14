import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import { default_female_clothes, default_male_clothes } from '../../constants/defaultChacterClothes';

import { Account } from './Account';
import { Alias } from './Alias';
import { CharacterCorporationRole } from './CharacterCorporationRole';
import { CharacterGroupRole } from './CharacterGroupRole';
import { CharacterIdLog } from './CharacterIdLog';
import { CharacterPunishment } from './CharacterPunishment';
import { House } from './House';
import { Report } from './Report';
import { Vehicle } from './Vehicle';

@Entity({ database: process.env.DB_DATABASE, schema: process.env.DB_SCHEMA })
export class Character {
	@PrimaryGeneratedColumn('increment')
	id?: number;

	@Column({ length: 30 })
	firstname!: string;

	@Column({ length: 30 })
	lastname!: string;

	@Column({ type: 'jsonb' })
	colors!: CharacterColors;

	@Column({ type: 'int' })
	gender!: number;

	@Column({ type: 'jsonb', nullable: false })
	parents!: CharacterParents;

	@Column('int', { array: true })
	faceFeatures!: number[];

	@Column({ type: 'jsonb' })
	headOverlay!: CharacterHeadOverlay[];

	@Column({ type: 'jsonb' })
	clothes?: CharacterClothingItem[];

	@Column({ type: 'jsonb' })
	hair!: CharacterHair;

	@Column({ type: 'jsonb' })
	position!: Position;

	@Column({ type: 'date' })
	dateOfBirth!: string;

	@Column({ length: 25 })
	nationality!: string;

	@Column({ type: 'text' })
	story!: string;

	@Column({ type: 'int8', default: 0 })
	timePlayed?: number;

	@Column({ type: 'jsonb' })
	inventory!: any;

	@Column({ type: 'jsonb', default: { armour: 0, health: 100, hunger: 100, thirst: 100 } })
	vitals?: CharacterVitals;

	@CreateDateColumn({ type: 'timestamptz' })
	dateCreated?: Date;

	@DeleteDateColumn({ type: 'timestamptz' })
	dateDeleted?: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	dateUpdated?: Date;

	@Index()
	@Column({ type: 'number', name: 'accountId' })
	@ManyToOne(() => Account, (account) => account.characters)
	account!: Account | number;

	@OneToMany(() => Alias, (alias) => alias.aliasing, { nullable: false, eager: true })
	aliasedCharacters?: Alias[];

	@OneToMany(() => Alias, (alias) => alias.aliased, { nullable: false, eager: true })
	aliasedByCharacters?: Alias[];

	@OneToMany(() => CharacterIdLog, (characterIdLog) => characterIdLog.character, { nullable: false, eager: true })
	characterIdLog?: CharacterIdLog[];

	@OneToMany(() => Vehicle, (vehicle) => vehicle.characterOwner, { nullable: false, eager: true })
	characterVehicle?: Vehicle[];

	@OneToMany(() => Report, (report) => report.claimedBy, { nullable: false, eager: true })
	characterClaimedBy?: Report[];

	@OneToMany(() => Report, (aliased) => aliased.reportedBy, { nullable: false, eager: true })
	characterReportedBy?: Report[];

	@OneToMany(() => House, (house) => house.characterOwner, { nullable: false, eager: true })
	houses?: House[];

	@OneToMany(() => CharacterPunishment, (characterPunishment) => characterPunishment.characterRecievedPunishment, { nullable: false, eager: true })
	characterPunishments?: CharacterPunishment[];

	@OneToMany(() => CharacterPunishment, (characterPunishment) => characterPunishment.characterIssuedPunishment, { nullable: false, eager: true })
	characterIssuedPunishments?: CharacterPunishment[];

	@OneToMany(() => CharacterCorporationRole, (characterCorporationRole) => characterCorporationRole.character)
	corporationRole?: CharacterCorporationRole | number;

	@OneToMany(() => CharacterGroupRole, (characterGroupRole) => characterGroupRole.character)
	groupRole?: CharacterGroupRole | number;

	//event listners
	@BeforeInsert()
	setDefaultCLothes?(): void {
		if (this.gender == 1) {
			this.clothes = default_male_clothes;
		} else {
			this.clothes = default_female_clothes;
		}
	}
}
