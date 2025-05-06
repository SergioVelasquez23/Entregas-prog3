import { Machinery } from "./machinery.model";
import { Procedure } from "./procedure.model";

export class Maintenance {
    id?: number;
    date?: Date;
    status?: string;
    machinery_id?: number;
    procedures?: Procedure;
    machinery?: Machinery;
    createdAt?: Date;
    updatedAt?: Date;
}
