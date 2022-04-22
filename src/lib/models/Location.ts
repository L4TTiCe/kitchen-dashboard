import type { Ownership } from "./Ownership";

export interface Location {
    _id?: string;
    name?: string;
    subLocations?: Location[];
    contents?: Ownership[];
}
