import { ReservationMaterialType } from "../types/reservationMaterial.type";

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

export const createReservationMaterial = async (reservationMaterial: ReservationMaterialType) => {
  return await fetchWithToken(`${API_URL}/reservationMaterial`, {
    method: "POST",
    body: JSON.stringify(reservationMaterial),
  });
};

export const findAllReservationMaterial = async () => {
  return await fetchWithToken(`${API_URL}/reservationMaterial`);
};

export const findOneReservationMaterialById = async (id: string) => {
  return await fetchWithToken(`${API_URL}/reservationMaterial/${id}`);
};

export const updateReservationMaterial = async (id: string, reservationMaterial: ReservationMaterialType) => {
  return await fetchWithToken(`${API_URL}/reservationMaterial/${id}`, {
    method: "PATCH",
    body: JSON.stringify(reservationMaterial),
  });
};

export const removeReservationMaterial = async (id: string) => {
  return await fetchWithToken(`${API_URL}/reservationMaterial/${id}`, {
    method: "DELETE",
  });
};