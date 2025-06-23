// ✅ FILE: src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../libs/axios';

interface DecodedToken {
  id: string;
  email: string;
  username: string;
  role: {
    name: string;
  };
  exp: number;
  iat: number;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.log(e);
        logout();
      }
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/local', { identifier: email, password });
    const token = res.data.jwt;
    localStorage.setItem('token', token);
    setToken(token);
    const decoded: DecodedToken = jwtDecode(token);
    setUser(decoded);
    const role = decoded.role?.name?.toLowerCase();
    if (role === 'vendor') navigate('/dashboard/vendors');
    else if (role === 'venuemanager') navigate('/dashboard/venue');
    else navigate('/dashboard/dashboardpage');
  };

  const register = async ({ email, password, name, role }: RegisterPayload) => {
    const res = await apiClient.post('/auth/local/register', {
      username: name,
      email,
      password,
      role,
    });
    const token = res.data.jwt;
    localStorage.setItem('token', token);
    setToken(token);
    const decoded: DecodedToken = jwtDecode(token);
    setUser(decoded);
    navigate('/dashboard/dashboardpage');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
