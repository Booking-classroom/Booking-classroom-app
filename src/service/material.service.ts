import { MaterialType } from "../types/material.type";

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

export const createMaterial = async (material: MaterialType) => {
  return await fetchWithToken(`${API_URL}/material`, {
    method: "POST",
    body: JSON.stringify(material),
  });
};

export const findAllMaterial = async () => {
  return await fetchWithToken(`${API_URL}/material`);
};

export const findOneMaterialById = async (id: string) => {
  return await fetchWithToken(`${API_URL}/material/${id}`);
};

export const updateMaterial = async (id: string, material: MaterialType) => {
  return await fetchWithToken(`${API_URL}/material/${id}`, {
    method: "PATCH",
    body: JSON.stringify(material),
  });
};

export const removeMaterial = async (id: string) => {
  return await fetchWithToken(`${API_URL}/material/${id}`, {
    method: "DELETE",
  });
};