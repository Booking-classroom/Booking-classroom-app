import { ReservationType } from "../types/reservation.type";


const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

export const createReservation = async (reservation: ReservationType) => {
  const response = await fetch(`${API_URL}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });
  const data = await response.json();
  return data;
};

export const findAllReservation = async () => {
  const response = await fetch(`${API_URL}/reservation`);
  const data = await response.json();
  return data;
};

export const findByClassroomId = async (id: string) => {
  const response = await fetch(`${API_URL}/reservation/classroom/${id}`);
  const data = await response.json();
  return data;
};

export const findByUserId = async (id: string) => {
  const response = await fetch(`${API_URL}/reservation/user/${id}`);
  const data = await response.json();
  return data;
};

export const updateReservation = async (id: string, reservation: ReservationType) => {
  const response = await fetch(`${API_URL}/reservation/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });
  const data = await response.json();
  return data;
};

export const removeReservation = async (id: string) => {
  return await fetch(`${API_URL}/reservation/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};