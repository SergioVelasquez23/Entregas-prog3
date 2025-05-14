import { MaintenanceProcedure } from "./maintenance-procedure.model";

export class Spare {
    id?: number;
    name?: string;
    brand?: string;
    description?: string;
    procedures?: MaintenanceProcedure;
    createdAt?: Date;
    updatedAt?: Date;
}
