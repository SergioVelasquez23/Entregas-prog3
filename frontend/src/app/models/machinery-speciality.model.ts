import { TypeService } from "./type-service.model";

export class EspecialidadMaquinaria {
    id?: number;
    tipo_servicio_id?: TypeService;
    tipo_trabajo?: string;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
