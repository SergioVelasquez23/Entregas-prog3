import { Insurance } from "./insurance.model";
import { Machinery } from "./machinery.model";
import { Operator } from "./operator.model";

export class Policy {
    id?: number;
    machinery_id?: number;
    operator_id?: number;
    insurance_id?: number;
    start_date?: Date;
    end_date?: Date;
    operator?: Operator;
    machinery?: Machinery;
    insurance?: Insurance;
    createdAt?: Date;
    updatedAt?: Date;

    
}
