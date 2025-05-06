import { Novelty } from "./novelty.model";
import { Service } from "./service.model";

export class Evidence {
    id?: number;
    file_type?: string;
    file_content?: string;
    load_date?: Date;
    service_id?: number;
    novelty_id?: number;
    service?: Service;
    novelty?: Novelty;
    createdAt?: Date;
    updatedAt?: Date;
}
