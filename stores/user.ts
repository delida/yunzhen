import { create } from "zustand";
import { State } from "./types/state";

const useUserStore = create<State.User>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set((state) => ({ ...state, userInfo })),
}));

export default useUserStore;
