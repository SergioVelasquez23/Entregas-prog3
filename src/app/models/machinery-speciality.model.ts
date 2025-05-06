import { TypeService } from "./type-service.model";

export class MachinerySpeciality {
    id?: number;
    type_service_id?: TypeService;
    type_work?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
