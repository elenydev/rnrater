import { createSelector } from 'reselect';
import { Store } from '../../../store/interface';

export const getIsLoading = createSelector(
  [(state: Store) => state.commentStore.isLoading],
  (isLoading) => isLoading
);

export const getPaging = createSelector(
  [(state: Store) => state.commentStore.paging],
  (paging) => paging
);

export const getList = createSelector(
  [(state: Store) => state.commentStore.list],
  (list) => list
);
