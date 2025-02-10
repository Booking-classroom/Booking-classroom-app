import { UserType } from "../types/user.type";


const API_URL = import.meta.env.API_URL;

export const createUser = async (user: UserType) => {
  const response = await fetch(`${API_URL}/reservationMaterial`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const findAllUser = async () => {
  const response = await fetch(`${API_URL}/user`);
  const data = await response.json();
  return data;
};


export const findOneUserById = async (id: string) => {
  const response = await fetch(`${API_URL}/User/${id}`);
  const data = await response.json();
  return data;
};

export const findOneUserByEmail = async (id: string) => {
  const response = await fetch(`${API_URL}/User/email/${id}`);
  const data = await response.json();
  return data;
};

export const updateUser = async (id: string, user: UserType) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const removeUser = async (id: string) => {
  return await fetch(`${API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};