import { useCallback } from "react";

interface HookParams {
  categoryId: string;
}

export const useCategoryItems = (params: HookParams) => {


  const loadCategoryItems = useCallback(() => {

  }, [params.categoryId]);


  return {
    loadCategoryItems
  }
}