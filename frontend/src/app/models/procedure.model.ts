import { Mantenimiento } from "./maintenance.model";

export class Procedimiento {
    id?: number;
    nombre?: string;
    descripcion?: string;
    mantenimientos?: Mantenimiento[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
