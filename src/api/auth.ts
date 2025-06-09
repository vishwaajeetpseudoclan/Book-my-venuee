// src/api/auth.ts
import apiClient from "../libs/axios";

// Login API
export const login = async (identifier: string, password: string) => {
  const response = await apiClient.post("/auth/local", {
    identifier,
    password,
  });
  return response.data;
};

// Register API
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await apiClient.post("/auth/local/register", {
    username,
    email,
    password,
  });
  return response.data;
};
