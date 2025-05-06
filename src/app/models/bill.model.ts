import { Quotas } from "./quotas.model";

export class Bill {
    id?: number;
    detail?: string;
    quota_id?: number;
    quota?: Quotas;
    createdAt?: Date;
    updatedAt?: Date;
}
