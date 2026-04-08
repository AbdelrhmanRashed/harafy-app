import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GovernorateStore {
  governorates: any;
  setGovernorates: (data: any) => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useGovernorateStore = create<GovernorateStore>()(
  persist(
    (set) => ({
      governorates: null,
      _hasHydrated: false,

      setGovernorates: (data) => set({ governorates: data }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: 'governorate-storage',

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
