import { AuthStatus, Roles, User } from '@/models/user.model';
import { login } from '@/pages/auth/pages/login/services/login.service';
import { create, StateCreator } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface AuthState {
  status: AuthStatus;
  user?: User;
  token?: string;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'unauthorized',
  user: undefined,
  token: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token, user } = await login({ email, password });
      set({ status: 'authorized', user, token });
    } catch (error) {
      set({ status: 'unauthorized', user: undefined, token: undefined });
      throw error; 
    }
  },
  logoutUser: () => {
    set({ status: 'unauthorized', user: undefined, token: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(storeApi, {
      name: 'auth-store',
    }),
  ),
);
