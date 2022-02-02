import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStoreLoading } from "../../../components/Auth/domain/selectors";
import { getCategoriesListTrigger } from "../domain/actions";

export const useCategories = () => {
  const isLoading = useSelector(getUserStoreLoading);
  const dispatch = useDispatch();

  const loadCategories = useCallback(() => {
    dispatch(getCategoriesListTrigger());
  }, []);

  return {
    isLoading,
    loadCategories,
  };
};
