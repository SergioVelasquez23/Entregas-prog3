import { Municipality } from "./municipality.model";

export class Construccion {
    id?: number;
    nombre?: string;
    paquete_id: number;
    municipio: Municipality;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
