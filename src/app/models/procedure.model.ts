import { Maintenance } from "./maintenance.model";

export class Procedure {
    id?: number;
    name?: string;
    description?: string;
    maintenances?: Maintenance[];
    createdAt?: Date;
    updatedAt?: Date;
}
