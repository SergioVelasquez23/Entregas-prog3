import { NumberSymbol } from "@angular/common";
import { Spare } from "./spare.model";

export class MaintenanceProcedure {
    id?: number;
    procedure_id?: number;
    maintenance_id?: number;
    status?: string;
    spares?: Spare[];
    createdAt?: Date;
    updatedAt?: Date;
    
}
