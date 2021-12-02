import { Store } from "../../store/interface";

export const getHistory = (state: Store) => state.historyStore.manager?.history;
