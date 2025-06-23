import apiClient from "../libs/axios";

export const fetchRoles = async () => {
  const response = await apiClient.get("/users-permissions/roles");
  return response.data.roles; // Assuming roles are inside a `roles` key
};
