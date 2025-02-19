import { MaterialType } from "./material.type";
import { ReservationType } from "./reservation.type";

export type ReservationMaterialType = {
    id: string;
    reservation: ReservationType | string;
    material: MaterialType | string;
    createdAt: string; 
    updatedAt: string;
    };