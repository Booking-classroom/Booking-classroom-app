import { ClassroomType } from "./classroom.type";
import { UserType } from "./user.type";

export enum Etat {
    CONFIRMEE = 'confirmée',
    EN_ATTENTE = 'en attente',
    ANNULEE = 'annulée',
    TERMINEE = 'terminée'
}

export type ReservationType = {
    id: string;
    user: UserType | string;
    classroom: ClassroomType | string;
    start_datetime: string;
    end_datetime: string;
    etat: Etat | string;
    };