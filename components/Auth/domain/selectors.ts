import { Store } from '../../../store/interface';

export const getCurrentUser = (store: Store) => store.userStore.user;
export const getUserStoreLoading = (store: Store) => store.userStore.isLoading;
