import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getCategoryPostsTrigger } from "../domain/actions";

interface HookParams {
  categoryId: string;
}

export const useCategoryItems = (params: HookParams) => {
  const dispatch = useDispatch();

  const loadCategoryItems = useCallback(() => {
    dispatch(getCategoryPostsTrigger({ categoryId: params.categoryId }));
  }, [params.categoryId]);

  return {
    loadCategoryItems,
  };
};
