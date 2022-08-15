import { PagingInfo } from 'infrastructure/api/interfaces';

export const getInifiteScrollCallback = (
  cb: () => void,
  paging: PagingInfo
) => {
  return paging.pageNumber * paging.pageSize < paging.totalCount ? cb() : null;
};
