export interface User {
    _id?: string;
    username: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    joinedOn?: Date
}
