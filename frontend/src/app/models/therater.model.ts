import { Projector } from "./projector.model";
import { Seat } from "./seat.model";

export class Therater {
    id?: number;
    location?: string;
    capacity?: number;
    projector?: Projector
    seats?: Seat[]; 
}
