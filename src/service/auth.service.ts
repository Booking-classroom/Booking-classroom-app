import { UserType } from "../types/user.type";

const API_URL = import.meta.env.API_URL;


export const signUp = async (UserType: UserType) => {
    const response = await fetch(`${API_URL}/auth/signUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(UserType),
    });
    const data = await response.json();
    return data;
}

export const signIn = async (UserType: UserType) => {
    const response = await fetch(`${API_URL}/auth/signIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(UserType),
    });
    const data = await response.json();
    return data;
}