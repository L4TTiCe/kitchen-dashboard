import type { Location } from './Location';

export interface Kitchen {
	_id?: string;
	name?: string;
	using_since?: Date;
	locations?: Location[];
}
