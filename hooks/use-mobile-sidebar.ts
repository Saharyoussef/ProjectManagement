import { create } from "zustand";
// Zustand is a valuable tool for managing state in React applications

type MobileSidebarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

//crée un composant React utilisant Zustand pour gérer l'état d'ouverture/fermeture d'un menu latéral mobile.