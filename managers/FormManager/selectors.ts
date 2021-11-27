import { Store } from "../../store/interface";

export const getFormManager = (state: Store) => state.formsStore.manager;
