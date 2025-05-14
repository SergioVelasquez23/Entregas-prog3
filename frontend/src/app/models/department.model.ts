import { Municipality } from "./municipality.model";
import { Ruler } from "./ruler.model";

export class Departamento {
    id?: number;
    nombre?: string;
    gobernantes?: Ruler[];
    municipios?: Municipality[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
