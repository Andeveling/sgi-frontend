import { AuthStatus, User } from '@/models/user.model';
import {
  checkProfileUser,
  login,
} from '@/pages/auth/pages/login/services/login.service';
import { create, StateCreator } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface AuthState {
  status: AuthStatus;
  user?: User;
  token?: string;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  checkProfileUser: () => Promise<void>;
}

const storeApi: StateCreator<
  AuthState,
  [],
  [['zustand/persist', unknown]],
  AuthState
> = (set) => ({
  status: 'unauthorized',
  user: undefined,
  token: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { data } = await login({ email, password });
      set({ status: 'authorized', user: data.user, token: data.token });
    } catch (error) {
      set({ status: 'unauthorized', user: undefined, token: undefined });
      throw error;
    }
  },
  checkProfileUser: async () => {
    try {
      const { data } = await checkProfileUser();
      set((state) => ({
        status: 'authorized',
        user: data,
        token: state.token,
      }));
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
      merge: (persistedState: unknown, currentState: AuthState) => ({
        ...currentState,
        ...(persistedState as AuthState),
      }),
    }),
    {
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);
