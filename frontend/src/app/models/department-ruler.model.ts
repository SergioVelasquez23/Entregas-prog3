import { Departamento } from "./department.model";
import { Ruler } from "./ruler.model";

export class GobernanteDepartamento {
    id?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    gobernante_id?: Ruler;
    departamento_id?: Departamento;
    departamento?: Departamento;
    gobernante?: Ruler;
    creadoEn?: Date;
    actualizadoEn?: Date;
}
