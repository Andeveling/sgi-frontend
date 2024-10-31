import api from '@/api/api';

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  roles: Roles[];
  accessToken: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<LoginResponse | string> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    }
    if (error.response) {
      return error.response.data.message || 'Error de autenticación';
    }
    return 'Error en la solicitud. Por favor, intenta de nuevo más tarde.';
  }
};
