export enum Etat {
    CONFIRMEE = 'confirmée',
    EN_ATTENTE = 'en attente',
    ANNULEE = 'annulée',
    TERMINEE = 'terminée'
}

export type ReservationType = {
    id: string;
    user: string;
    classroom: string;
    start_datetime: string;
    end_datetime: string;
    etat: Etat;
    };