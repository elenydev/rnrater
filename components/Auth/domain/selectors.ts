import { Store } from "../../../store/interface";

export const getCurrentUser = (store: Store) => store.userStore.user;