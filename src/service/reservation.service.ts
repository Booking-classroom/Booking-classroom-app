import { ReservationType } from "../types/reservation.type";

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

const getToken = () => {
  return localStorage.getItem('jwtToken');
};

const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  return data;
};

export const createReservation = async (reservation: ReservationType) => {
  return await fetchWithToken(`${API_URL}/reservation`, {
    method: "POST",
    body: JSON.stringify(reservation),
  });
};

export const findAllReservation = async () => {
  const reservation =  await fetchWithToken(`${API_URL}/reservation`);
  return reservation;
};

export const findByClassroomId = async (id: string) => {
  const reservation = await fetchWithToken(`${API_URL}/reservation/classroom/${id}`);
  console.log('reservation : ', reservation);
  return reservation;
};

export const findByUserId = async (id: string) => {
  return await fetchWithToken(`${API_URL}/reservation/user/${id}`);
};

export const updateReservation = async (id: string, reservation: ReservationType) => {
  return await fetchWithToken(`${API_URL}/reservation/${id}`, {
    method: "PATCH",
    body: JSON.stringify(reservation),
  });
};

export const removeReservation = async (id: string) => {
  return await fetchWithToken(`${API_URL}/reservation/${id}`, {
    method: "DELETE",
  });
};