import { create } from "zustand";

interface IReomveFilter {
  isVisible: boolean;
  onHide: () => void;
  onVisible: () => void;
}

const useRemoveFilter = create<IReomveFilter>((set) => {
  return {
    isVisible: false,
    onHide: () => set({ isVisible: false }),
    onVisible: () => set({ isVisible: true }),
  };
});

export default useRemoveFilter;
