import { Department } from "./department.model";
import { Ruler } from "./ruler.model";

export class DepartmentRuler {
    id?: number;
    start_date?: Date;
    end_date?: Date;
    ruler_id?: Ruler;
    department_id?: Department;
    department?: Department;
    ruler?: Ruler;
    createdAt?: Date;
    updatedAt?: Date;
}
