import api from '@/api/api';
import { User } from '@/models/user.model';
import { AxiosError } from 'axios';

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    if (!res.data) {
      throw new Error('Something went wrong');
    }
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
};
