import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsListTrigger,
  updatePaging as updatePagingAction,
} from "../domain/actions";
import { getIsLoading, getList, getPaging } from "../domain/selectors";

export const useComments = (categoryPostId: string) => {
  const isLoading = useSelector(getIsLoading);
  const list = useSelector(getList);
  const paging = useSelector(getPaging);
  const dispatch = useDispatch();

  const loadComments = useCallback(() => {
    const controller = new AbortController();
    dispatch(getCommentsListTrigger({ controller, categoryPostId }));

    return () => {
      controller.abort();
    };
  }, []);

  const updatePaging = useCallback(() => {
    dispatch(
      updatePagingAction({
        pageSize: paging.pageSize,
        pageNumber: paging.pageNumber + 1,
      })
    );
    loadComments();
  }, [[paging]]);

  return {
    isLoading,
    list,
    paging,
    loadComments,
    updatePaging,
  };
};
