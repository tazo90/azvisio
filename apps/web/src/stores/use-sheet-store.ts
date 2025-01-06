import { SheetConfig } from '@/lib/forms/sheet-builder';
import { create } from 'zustand';

interface Sheet {
  config: SheetConfig;
  isOpen: boolean;
}

interface SheetStore {
  sheets: Record<string, Sheet>;
  openSheet: (id: string, config: SheetConfig) => void;
  closeSheet: (id: string) => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  sheets: {},
  openSheet: (id, config) =>
    set((state) => ({
      sheets: {
        ...state.sheets,
        [id]: { config, isOpen: true },
      },
    })),
  closeSheet: (id) =>
    set((state) => ({
      sheets: {
        ...state.sheets,
        [id]: { ...state.sheets[id], isOpen: false },
      },
    })),
}));
