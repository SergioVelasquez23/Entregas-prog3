import { Poliza } from "./policy.model";

export class Insurance {
    id?: number;
    name?: string;
    description?: string;
    policies: Poliza[];
    createdAt?: Date;
    updatedAt?: Date;
}
