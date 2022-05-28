import { Store } from "../../../store/interface";

export const getCategoryPostsList = (store: Store) =>
  store.categoryPostsStore.list;
export const getCategoryPostsPaging = (store: Store) =>
  store.categoryPostsStore.paging;
export const getCategoryPostsLoading = (store: Store) =>
  store.categoryPostsStore.isLoading;
