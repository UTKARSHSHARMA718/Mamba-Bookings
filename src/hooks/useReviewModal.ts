import { create } from "zustand";

type ReviewModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setRating: (v: number) => void;
  setReview: (v: string) => void;
  rating: number;
  review: string;
  data: {
    ratingId: string;
    userId: string;
    listingId: string;
  };
  setData: (v1: string, v2: string, v3: string) => void;
};

const useReviewModal = create<ReviewModalProps>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false}),
    rating: 1,
    review: "",
    setRating: (value: number) => set({ rating: value }),
    setReview: (value: string) => set({ review: value }),
    data: {
      ratingId: "",
      userId: "",
      listingId: "",
    },
    setData: (uId: string, lId: string, rId: string) =>
      set({ data: { ratingId: rId, userId: uId, listingId: lId } }),
  };
});

export default useReviewModal;
