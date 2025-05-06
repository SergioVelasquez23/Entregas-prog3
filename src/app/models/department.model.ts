import { Municipality } from "./municipality.model";
import { Ruler } from "./ruler.model";

export class Department {
    id?: number;
    name?: string;
    rulers?: Ruler[];
    municipalities?: Municipality[];
    createdAt?: Date;
    updatedAt?: Date;
}
