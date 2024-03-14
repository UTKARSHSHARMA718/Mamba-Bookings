import { create } from "zustand";

// TODO: shift all the types to respective types folder
type RentModalPoperties = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useRentModal = create<RentModalPoperties>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});

export default useRentModal;
