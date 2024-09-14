import { create } from "zustand";
import { State } from "./types/state";

const useLandStore = create<State.Land>((set) => ({
  landList: [],
  setLandList: (landList) => set((state) => ({ ...state, landList })),
}));

export default useLandStore;
