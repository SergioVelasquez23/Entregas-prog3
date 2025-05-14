import { Combo } from "./combo.model";
import { Evidence } from "./evidence.model";
import { Quotas } from "./quotas.model";

export class Servicio {
    id?: number;
    costo?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    prioridad?: string;
    tipo?: string;
    estado?: string;
    ubicacion?: string;
    resumen?: string;
    quota?: Quotas[];
    evidence?: Evidence[];
    combo?: Combo;
    createdAt?: Date;
    updatedAt?: Date;

}
