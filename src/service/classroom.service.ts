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

  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  return data;
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