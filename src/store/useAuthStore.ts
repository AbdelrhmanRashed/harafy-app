import { create } from 'zustand';

// Auth-only user shape — profile data lives in React Query, NOT here.
export interface User {
  fullName: string;
  email: string;
  pictureUrl: string | null;
  role: string[];
  isProvider: boolean;
  providerStatus: string | null;
  accessToken: string;
  isAuthenticated: boolean;
  /** Numeric status code received from the login response (0=Pending, 1=UnderReview, 2=Approved, 3=Rejected, 4=Suspended, 5=Completed) */
  status: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  saveUser: (data: any) => void;
  removeUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Hydrate from localStorage on first load
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
        pictureUrl: data.pictureUrl ?? null,
        role: data.role,
        isProvider: data.isProvider,
        providerStatus: data.providerStatus ?? null,
        accessToken: data.accessToken,
        isAuthenticated: data.isAuthenticated,
        status: data.status,
      };

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', String(data.isAuthenticated));

      set({ user, token: data.accessToken, isAuthenticated: data.isAuthenticated });
    },

    removeUser: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      set({ user: null, token: null, isAuthenticated: false });
    },

    updateUser: (updates) => {
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...updates };
        
        if (JSON.stringify(state.user) === JSON.stringify(updatedUser)) return state;

        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { user: updatedUser };
      });
    },
  };
});
