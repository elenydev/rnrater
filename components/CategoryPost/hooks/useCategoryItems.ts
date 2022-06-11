import { PostCategoryPostParams } from "api/categoryPost/post/interfaces";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getCategoryPostsTrigger,
  postCategoryPostTrigger,
} from "../domain/actions";

interface HookParams {
  categoryId: string;
}

export const useCategoryItems = (params: HookParams) => {
  const dispatch = useDispatch();

  const loadCategoryItems = useCallback(() => {
    dispatch(getCategoryPostsTrigger({ categoryId: params.categoryId }));
  }, [params.categoryId]);

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
    createCategoryPost
  };
};
