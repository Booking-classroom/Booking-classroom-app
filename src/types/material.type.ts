export enum Etat {
    NEUF = 'neuf',
    BON = 'bon',
    ABIME = 'abimé',
    DISFONCTIONNEL = 'disfonctionnel'
}

export type MaterialType = {
    id: string;
    name: string;
    description: string;
    etat: Etat;
    };