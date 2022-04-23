import type { Nutrition } from './Nutrition';

export interface Food {
	_id?: string;
	name?: string;
	upc?: string;
	createdOn?: Date;
	nutrition?: Nutrition;
}
