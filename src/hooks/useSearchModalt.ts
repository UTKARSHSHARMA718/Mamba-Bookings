import { create } from "zustand";

type SearchModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  screenNo: number;
  setScreen: (v: number) => void;
};

const useSearchModal = create<SearchModalProps>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setScreen: (value: number) => set({ screenNo: value }),
    screenNo: 0,
  };
});

export default useSearchModal;
