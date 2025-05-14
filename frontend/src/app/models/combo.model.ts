import { Construccion } from "./construction.model";

export class Combo {
    id?: number;
    servicio_id?: number;
    construcciones?: Construccion[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
