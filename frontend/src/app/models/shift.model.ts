import { Novelty } from "./novelty.model";

export class Shift {
    id?: number;
    date?: Date;
    operator_id?: number;
    machinery_id?: number;
    novelties?: Novelty[];
    createdAt?: Date;
    updatedAt?: Date;
}
