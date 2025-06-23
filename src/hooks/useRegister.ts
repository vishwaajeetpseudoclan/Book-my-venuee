import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserRole } from "../types/roles";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

const registerUser = async (data: RegisterPayload) => {
  const response = await axios.post(import.meta.env.VITE_API_REGISTER_URL, data);

  const { jwt, usename, id, role, roleId } = response.data;
  const user = {
    id,
    username: usename,
    email: data.email,
    role,
    roleId,
  };

  // Save token and user to localStorage (or a secure place)
  localStorage.setItem("token", jwt);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export default function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}
