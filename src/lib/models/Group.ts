import type {User} from "./User";

export interface Group {
    _id?: string;
    name: string;
    createdOn?: Date;
    members?: User[];
}
