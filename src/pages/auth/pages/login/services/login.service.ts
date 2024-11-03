import api from '@/api/api';
import { User } from '@/models/user.model';

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export interface CheckProfileResponse extends User {
  sub: string;
  iat: number;
  exp: number;
}

export const login = ({ email, password }: LoginRequest) => {
  return api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
};

export const checkProfileUser = async () => {
  return api.get<CheckProfileResponse>('/auth/profile');
};
