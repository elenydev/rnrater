import { createSelector } from 'reselect';
import { Store } from '../../../store/interface';

export const getCategoryPostsList = createSelector(
  [(store: Store) => store.categoryPostsStore.list],
  (list) => list
);
export const getCategoryPostsPaging = createSelector(
  [(store: Store) => store.categoryPostsStore.paging],
  (paging) => paging
);
export const getCategoryPostsLoading = createSelector(
  [(store: Store) => store.categoryPostsStore.isLoading],
  (isLoading) => isLoading
);

export const getCurrentCategoryPost = createSelector(
  [(store: Store) => store.categoryPostsStore.currentCategoryPost],
  (currentPost) => currentPost
);
