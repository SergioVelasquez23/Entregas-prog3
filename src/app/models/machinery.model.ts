import { Combo } from "./combo.model";
import { GPS } from "./gps.model";
import { Insurance } from "./insurance.model";
import { Maintenance } from "./maintenance.model";
import { Operator } from "./operator.model";
import { Speciality } from "./speciality.model";

export class Machinery {
    id?: number;
    speciality?: string;
    brand?: string;
    model?: string;
    status?: string;
    location?: string;
    disponibility?: string;
    assignment_date?: Date;
    retirement_date?: Date;
    operators: Operator[];
    specialities?: Speciality[];
    combos?: Combo[];
    maintenances: Maintenance[];
    insurances: Insurance[];
    createdAt?: Date;
    updatedAt?: Date;

}
