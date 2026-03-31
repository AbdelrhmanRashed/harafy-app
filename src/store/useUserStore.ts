import { create } from "zustand";

interface UserState {
  // بيانات الـ user
  name: string;
  email: string;
  phone: string;
  location: string;
  language: string;
  role: "client" | "provider";
  avatar: string | null;

  // actions
  setAvatar: (file: File) => void;
  setUser: (data: Partial<Omit<UserState, "setAvatar" | "setUser">>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  // default values
  name: "",
  email: "",
  phone: "",
  location: "",
  language: "ar",
  role: "provider",
  avatar: null,

  setAvatar: (file) => {
    const url = URL.createObjectURL(file);
    set({ avatar: url });
  },

  setUser: (data) => set((state) => ({ ...state, ...data })),
}));