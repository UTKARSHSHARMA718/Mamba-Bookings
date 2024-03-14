import { create } from "zustand";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const useRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
