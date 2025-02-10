import { ClassroomType } from "../types/classroom.type";


const API_URL = import.meta.env.API_URL;

export const createClassroom = async (classroom: ClassroomType) => {
  const response = await fetch(`${API_URL}/classroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classroom),
  });
  const data = await response.json();
  return data;
};

export const findAllClassroom = async () => {
  const response = await fetch(`${API_URL}/classroom`);
  const data = await response.json();
  return data;
};

export const findOneClassroomById = async (id: string) => {
  const response = await fetch(`${API_URL}/classroom/${id}`);
  const data = await response.json();
  return data;
};

export const findClassroomByAvailability = async (id: string) => {
  const response = await fetch(`${API_URL}/classroom/availability/${id}`);
  const data = await response.json();
  return data;
};


export const updateClassroom = async (id: string, classroom: ClassroomType) => {
  const response = await fetch(`${API_URL}/classroom/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classroom),
  });
  const data = await response.json();
  return data;
};

export const removeClassroom = async (id: string) => {
  return await fetch(`${API_URL}/classroom/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};