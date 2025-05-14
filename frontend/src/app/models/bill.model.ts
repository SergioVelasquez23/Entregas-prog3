import { Quotas } from "./quotas.model";

export class Factura {
    id?: number;
    detalle?: string;
    cuota_id?: number;
    cuota?: Quotas;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
