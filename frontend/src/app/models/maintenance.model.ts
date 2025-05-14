import { Maquinaria } from "./machinery.model";
import { Procedimiento } from "./procedure.model";

export class Mantenimiento {
    id?: number;
    fecha?: Date;
    estado?: string;
    maquinaria_id?: number;
    procedimientos?: Procedimiento;
    maquinaria?: Maquinaria;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
