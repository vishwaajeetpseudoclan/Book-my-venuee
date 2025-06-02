import apiClient from '../libs/axios';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('auth/local', { identifier: email, password });
  return response.data;
};
