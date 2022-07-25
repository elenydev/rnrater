import { PostCategoryPostParams } from "../../../api/categoryPost/post/interfaces";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getCategoryPostsTrigger,
  postCategoryPostTrigger,
} from "../domain/actions";
import {
  getCategoryPostsList,
  getCategoryPostsLoading,
} from "../domain/selectors";

interface HookParams {
  categoryId: string;
}

export const useCategoryItems = (params: HookParams) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getCategoryPostsLoading, shallowEqual);
  const list = useSelector(getCategoryPostsList, shallowEqual);

  const loadCategoryItems = useCallback(
    (controller: AbortController) => {
      dispatch(
        getCategoryPostsTrigger({ categoryId: params.categoryId, controller })
      );
    },
    [params.categoryId]
  );

  const createCategoryPost = useCallback(
    (data: Omit<PostCategoryPostParams, "categoryId">) => {
      dispatch(
        postCategoryPostTrigger({
          ...data,
          categoryId: params.categoryId,
        })
      );
    },
    [params.categoryId]
  );

  return {
    loadCategoryItems,
    createCategoryPost,
    isLoading,
    list,
  };
};
