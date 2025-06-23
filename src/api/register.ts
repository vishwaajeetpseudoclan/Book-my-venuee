import apiClient from "../libs/axios";

export const register = async (data: {
  username: string;
  email: string;
  password: string;
  role: string; // This is the role ID
}) => {
  const response = await apiClient.post("/auth/local/register", {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role,
  });
  return response.data;
};
