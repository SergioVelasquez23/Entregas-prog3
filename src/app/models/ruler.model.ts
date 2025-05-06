import { Department } from "./department.model";
import { Municipality } from "./municipality.model";

export class Ruler {
    id?: number;
    user_id?: string;
    start_period?: Date;
    end_period?: Date;
    departments?: Department;
    municipality?: Municipality;
    createdAt?: Date;
    updatedAt?: Date;
}
