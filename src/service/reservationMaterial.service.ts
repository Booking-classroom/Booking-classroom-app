import { ReservationMaterialType } from "../types/reservationMaterial.type";


const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

export const createReservationMaterial = async (reservationMaterial: ReservationMaterialType) => {
  const response = await fetch(`${API_URL}/reservationMaterial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationMaterial),
  });
  const data = await response.json();
  return data;
};

export const findAllReservationMaterial = async () => {
  const response = await fetch(`${API_URL}/reservationMaterial`);
  const data = await response.json();
  return data;
};


export const findOneReservationMaterialById = async (id: string) => {
  const response = await fetch(`${API_URL}/reservationMaterial/${id}`);
  const data = await response.json();
  return data;
};

export const updateReservationMaterial = async (id: string, reservationMaterial: ReservationMaterialType) => {
  const response = await fetch(`${API_URL}/reservationMaterial/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationMaterial),
  });
  const data = await response.json();
  return data;
};

export const removeReservationMaterial = async (id: string) => {
  return await fetch(`${API_URL}/reservationMaterial/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};