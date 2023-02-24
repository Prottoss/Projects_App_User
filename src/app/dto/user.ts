import { Ticket } from "./ticket";
import { Vehicle } from "./vehicle";

export interface User {
    uid: string;
    email: string;
    Name: string;
    Surname: string;
    vehicles: Vehicle[];
    tickets: Ticket[];
 }