import { Novelty } from "./novelty.model";
import { Servicio } from "./service.model";

export class Evidencia {
    id?: number;
    tipo_archivo?: string;
    contenido_archivo?: string;
    fecha_carga?: Date;
    servicio_id?: number;
    novedad_id?: number;
    servicio?: Servicio;
    novedad?: Novelty;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
