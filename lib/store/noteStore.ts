import { FormValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: FormValues;
  setDraft: (note: FormValues) => void;
  clearDraft: () => void;
};

const initialDraft: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",

      partialize: (state) => ({ draft: state.draft }),
    }
  )
);