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

  const handleResponse = async (response: Response) => {
    const responseText = await response.text();

    try {
      const responseData = JSON.parse(responseText);

      const newToken = responseData.token;
      if (newToken) {
        const token = newToken;
        localStorage.setItem("jwtToken", token);
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Une erreur est survenue.");
      }
      return responseData;
    } catch (error) {
      console.error("Réponse du serveur (non-JSON) :", responseText);
      throw new Error(responseText || "Une erreur inattendue est survenue.");
    }
  };

  const response = await fetch(url, { ...options, headers });
  return await handleResponse(response);
};

export const createReservation = async (reservation: ReservationType) => {
  return await fetchWithToken(`${API_URL}/reservation`, {
    method: "POST",
    body: JSON.stringify(reservation),
  });
};

export const findAllReservation = async () => {
  return await fetchWithToken(`${API_URL}/reservation`);
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