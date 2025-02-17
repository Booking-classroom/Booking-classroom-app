import { ClassroomType } from "../types/classroom.type";

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

export const createClassroom = async (classroom: ClassroomType) => {
  return await fetchWithToken(`${API_URL}/classroom`, {
    method: "POST",
    body: JSON.stringify(classroom),
  });
};

export const findAllClassroom = async () => {
  return await fetchWithToken(`${API_URL}/classroom`);
};

export const findOneClassroomById = async (id: string) => {
  return await fetchWithToken(`${API_URL}/classroom/${id}`);
};

export const findClassroomByAvailability = async (id: string) => {
  return await fetchWithToken(`${API_URL}/classroom/availability/${id}`);
};

export const updateClassroom = async (id: string, classroom: ClassroomType) => {
  return await fetchWithToken(`${API_URL}/classroom/${id}`, {
    method: "PATCH",
    body: JSON.stringify(classroom),
  });
};

export const removeClassroom = async (id: string) => {
  return await fetchWithToken(`${API_URL}/classroom/${id}`, {
    method: "DELETE",
  });
};