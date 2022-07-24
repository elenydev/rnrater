import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsListTrigger } from "../domain/actions";
import { getIsLoading, getList } from "../domain/selectors";

export const useComments = (categoryPostId: string) => {
  const isLoading = useSelector(getIsLoading);
  const list = useSelector(getList);
  const dispatch = useDispatch();

  const loadComments = useCallback(() => {
    const controller = new AbortController();
    dispatch(getCommentsListTrigger({ controller, categoryPostId }));

    return () => {
      controller.abort();
    };
  }, []);

  return {
    isLoading,
    list,
    loadComments,
  };
};
