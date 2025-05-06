import { Municipality } from "./municipality.model";

export class Construction {
    id?: number;
    name?: string;
    combo_id: number;
    municipality: Municipality;
    createdAt?: Date;
    updatedAt?: Date;
    
}
