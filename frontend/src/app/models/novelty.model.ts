import { Shift } from "./shift.model";

export class Novelty {
    id?: number;
    type?: string;
    description?: string;
    evidence?: string;
    gravity?: string;
    shift_id?: Shift;
    shift?: Shift;
    createdAt?: Date;
    updatedAt?: Date;
}
