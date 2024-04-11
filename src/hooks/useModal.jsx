import { create } from "zustand";

export const useModal = create((set) => ({
  type: null,
  data: {},
  isOpen: false,
  subModal: {
    subType: null,
    isOpen: false,
    data: {},
    onClose: () =>
      set((state) => ({
        subModal: { ...state.subModal, isOpen: false, subType: null },
      })),
  },
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onOpenSubModal: (subType, data = {}) =>
    set((state) => ({
      subModal: {
        isOpen: true,
        subType,
        data,
        onClose: state.subModal.onClose,
      },
    })),
  onClose: () => set({ type: null, isOpen: false }),
}));
