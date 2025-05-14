import { Message } from "./message.model";

export class Chat {
    id?: number;
    titulo?: string;
    tipo?: string;
    mensajes?: Message[];
    creadoEn?: Date;
    actualizadoEn?: Date;
}
