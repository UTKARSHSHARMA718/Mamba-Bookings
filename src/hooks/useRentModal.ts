import { create } from "zustand";
import useQueryParams from "./useQueryParams";

// TODO: shift all the types to respective types folder
type RentModalPoperties = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useRentModalHelper = create<RentModalPoperties>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});

const useRentModal = () => {
  const { isOpen, onOpen, onClose } = useRentModalHelper();
  const { setQueryParams } = useQueryParams();

  return {
    isOpen,
    onClose,
    onOpen: () => {
      setQueryParams({
        queryName: "rent-modal",
        value: "open",
      });
      onOpen();
    },
  };
};

export default useRentModal;
