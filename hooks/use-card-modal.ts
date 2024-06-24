import { create } from "zustand";
// Zustand is a valuable tool for managing state in React applications

type CardModalStore = {
    id?:string;
    isOpen: boolean;
    onOpen: (id:string) => void;
    onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
    id:undefined,
    isOpen: false,
    onOpen: (id:string) => set({ isOpen: true,id }),
    onClose: () => set({ isOpen: false,id:undefined }),
}));

//crée un composant React utilisant Zustand pour gérer l'état d'ouverture/fermeture d'un menu latéral mobile.