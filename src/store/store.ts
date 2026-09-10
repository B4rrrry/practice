import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MainState {
  isShowSidebar: boolean;
  theme: "dark" | "light";
  toggleSidebar: (state: boolean) => void;
  toggleTheme: (theme: MainState["theme"]) => void;
}

export const useMainStore = create<MainState>()(
  persist(
    (set) => ({
      isShowSidebar: false,
      theme: "light",
      toggleSidebar: (state) => set(() => ({ isShowSidebar: state })),
      toggleTheme: (theme) => set(() => ({ theme })),
    }),
    { name: "main-storage" },
  ),
);
