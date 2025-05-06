import { Message } from "./message.model";

export class Chat {
    id?: number;
    title?: string;
    type?: string;
    messages?: Message[];
    createdAt?: Date;
    updatedAt?: Date;
}
