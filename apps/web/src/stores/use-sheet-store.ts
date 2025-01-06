import { SheetConfig } from '@/lib/forms/sheet-builder';
import { create } from 'zustand';

interface Sheet {
  id: string;
  config: SheetConfig;
  isOpen: boolean;
}

interface SheetStore {
  sheets: Record<string, Sheet>;
  stack: string[]; // stos ID sheetów w kolejności otwierania
  openSheet: (id: string, config: SheetConfig) => void;
  closeSheet: (id: string) => void;
  getActiveSheet: () => Sheet | null;
}

export const useSheetStore = create<SheetStore>((set, get) => ({
  sheets: {},
  stack: [],

  openSheet: (id, config) => {
    console.log('OPEN', id);
    set((state) => ({
      sheets: {
        ...state.sheets,
        [id]: { id, config, isOpen: true },
      },
      // Dodaj nowy sheet na stos
      stack: [...state.stack, id],
    }));
  },

  closeSheet: (id) => {
    set((state) => ({
      sheets: {
        ...state.sheets,
        [id]: { ...state.sheets[id], isOpen: false },
      },
      // Usuń sheet ze stosu
      stack: state.stack.filter((sheetId) => sheetId !== id),
    }));
  },

  getActiveSheet: () => {
    const state = get();
    const activeSheetId = state.stack[state.stack.length - 1];
    return activeSheetId ? state.sheets[activeSheetId] : null;
  },
}));
