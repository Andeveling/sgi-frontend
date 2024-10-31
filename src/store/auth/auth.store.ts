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
      const res = await login({ email, password });
      const data = res as { id: number; name: string; email: string; cellphone: string; roles: Roles[]; accessToken: string };
      console.log(data)
      set({ status: 'autorice', user: data, token: data.accessToken });
    } catch (error) {
      set({ status: 'unauthorized' });
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
