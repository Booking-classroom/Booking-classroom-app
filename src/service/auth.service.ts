import { UserType } from "../types/user.type";

const API_URL = import.meta.env.API_URL || 'http://localhost:3000/api';

export const signUp = async (user: UserType) => {
    console.log("API_URL", API_URL);
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("SignUp Error:", error);
        throw error;
    }
}

export const signIn = async (user: UserType) => {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("SignIn Error:", error);
        throw error;
    }
}