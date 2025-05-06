import { Bill } from "./bill.model";
import { Service } from "./service.model";

export class Quotas {
    id?: number;
    service_id?: number;
    quantity?: number;
    email?: string;
    client_name?: string;
    payment_reference?: string;
    expiration_date?: Date;
    paid?: boolean;
    bill?: Bill;
    service?: Service;
    createdAt?: Date;
    updatedAt?: Date;
}
