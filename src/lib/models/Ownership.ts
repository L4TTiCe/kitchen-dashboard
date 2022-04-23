import type { User } from "./User";
import type { Food } from "./Food";

export interface Ownership {
    _id?: string;
    owner?: User;
    food?: Food;
    quantity?: number;
    quantity_unit?: string;
    price?: number;
    date_procured?: Date | string;
    date_expiry?: Date | string;
    located_at?: Location;
}
