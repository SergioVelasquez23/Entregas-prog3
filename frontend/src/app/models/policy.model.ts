import { Insurance } from "./insurance.model";
import { Machinery } from "./machinery.model";
import { Operario } from "./operator.model";

export class Poliza {
    id?: number;
    maquinaria_id?: number;
    operario_id?: number;
    seguro_id?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    operario?: Operario;
    maquinaria?: Machinery;
    seguro?: Insurance;
    creadoEn?: Date;
    actualizadoEn?: Date;


}
