import { create } from 'zustand';

export interface User {
  fullName: string;
  email: string;
  pictureUrl: string | null;
  role: string[];
  isProvider: boolean;
  providerStatus: string | null;
  accessToken: string;
  isAuthenticated: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  updateUserPartial: (data: Partial<User>) => void;

  saveUser: (data: any) => void;
  removeUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  //hydrate the store with the data from localStorage
  const storedToken = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    isAuthenticated: !!storedIsAuthenticated,

    saveUser: (data) => {
      const user: User = {
        fullName: data.fullName,
        email: data.email,
        pictureUrl: data.pictureUrl,
        role: data.role,
        isProvider: data.isProvider,
        providerStatus: data.providerStatus,
        accessToken: data.accessToken,
        isAuthenticated: data.isAuthenticated,
      };

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', data.isAuthenticated);

      set({
        user,
        token: data.accessToken,
        isAuthenticated: data.isAuthenticated,
      });
    },

    updateUserPartial: (data: Partial<User>) =>
      set((state) => {
        if (!state.user) return state;

        const updatedUser = {
          ...state.user,
          ...data,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));

        return {
          ...state,
          user: updatedUser,
        };
      }),

    removeUser: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },
  };
});
