import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

const useAuth = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      // Store the token in localStorage or sessionStorage
      localStorage.setItem("token", data.jwt);
      // Optionally, you can also store user information
      localStorage.setItem("user", JSON.stringify(data.user));

      localStorage.setItem("ROLE", JSON.stringify(data.user.role));
      localStorage.setItem("AUTH_TOKEN", data.jwt);
    },
  });
};

export default useAuth;
