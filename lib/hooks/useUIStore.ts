"use client";
import { create } from "zustand";

interface UIState {
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  accent: string;
  setAccent: (a: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  settingsOpen: false,
  openSettings: () => set({ settingsOpen: true }),
  closeSettings: () => set({ settingsOpen: false }),
  accent: "violet",
  setAccent: (accent) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-accent", accent);
      localStorage.setItem("accent", accent);
    }
    set({ accent });
  },
}));
