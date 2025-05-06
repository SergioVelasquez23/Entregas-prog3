import { Service } from "./service.model";

export class Evidence {
    id?: number;
    type_archive?: string;
    content_archive?: string;
    load_date?: Date;
    service_id?: number;
    service: Service;
    createdAt?: Date;
    updatedAt?: Date;
}
