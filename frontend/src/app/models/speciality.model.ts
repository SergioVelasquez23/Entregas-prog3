import { Operario } from "./operator.model";

export class Especialidad {
    id?: number;
    nombre?: string;
    operarios?: Operario[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
