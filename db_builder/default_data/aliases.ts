import { Alias } from '../../packages/db/entities/Alias';

export const default_aliases: Alias[] = [
	{ aliasing: 1, aliased: 2, alias: 'alias from char 1 to char 2' },
	{ aliasing: 2, aliased: 1, alias: 'alias from char 2 to char 1' }
];
