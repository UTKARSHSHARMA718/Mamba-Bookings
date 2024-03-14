import { create } from "zustand";

type UserDropdownTypes = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const useUserDropdown = create<UserDropdownTypes>((set) => {
  return {
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  };
});

export default useUserDropdown;
