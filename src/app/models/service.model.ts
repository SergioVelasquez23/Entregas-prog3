import { Combo } from "./combo.model";
import { Evidence } from "./evidence.model";
import { Quotas } from "./quotas.model";

export class Service {
    id?: number;
    cost?: number;
    start_date?: Date;
    end_date?: Date;
    priority?: string;
    type?: string;
    status?: string;
    location?: string;
    summary?: string;
    quota?: Quotas[];
    evidence?: Evidence[];
    combo?: Combo;
    createdAt?: Date;
    updatedAt?: Date;

}
