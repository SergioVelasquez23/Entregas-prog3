import { Combo } from "./combo.model";
import { GPS } from "./gps.model";
import { Insurance } from "./insurance.model";
import { Maintenance } from "./maintenance.model";
import { Operator } from "./operator.model";

export class Machinery {
    id?: number;
    speciality?: string;
    brand?: string;
    model?: string;
    status?: string;
    location?: string;
    disponibility?: string;
    operators: Operator[];
    combos?: Combo[];
    gps?: GPS;
    maintenances: Maintenance[];
    insurances: Insurance[];
    createdAt?: Date;
    updatedAt?: Date;

}
