import { MaterialType } from "../types/material.type";

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

export const createMaterial = async (material: MaterialType) => {
  const response = await fetch(`${API_URL}/material`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(material),
  });
  const data = await response.json();
  return data;
};

export const findAllMaterial = async () => {
  const response = await fetch(`${API_URL}/material`);
  const data = await response.json();
  return data;
};

export const findOneMaterialById = async (id: string) => {
  const response = await fetch(`${API_URL}/material/${id}`);
  const data = await response.json();
  return data;
};


export const updateMaterial = async (id: string, material: MaterialType) => {
  const response = await fetch(`${API_URL}/material/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(material),
  });
  const data = await response.json();
  return data;
};

export const removeMaterial = async (id: string) => {
  return await fetch(`${API_URL}/material/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};