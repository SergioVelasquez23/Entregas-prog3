import { Policy } from "./policy.model";

export class Insurance {
    id?: number;
    name?: string;
    description?: string;
    policies: Policy[];
    createdAt?: Date;
    updatedAt?: Date;
}
