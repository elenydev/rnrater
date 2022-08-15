import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesListTrigger } from '../domain/actions';
import { getCategorieslist, getIsLoadingCategories } from '../domain/selectors';

export const useCategories = () => {
  const isLoading = useSelector(getIsLoadingCategories);
  const categoriesList = useSelector(getCategorieslist);
  const dispatch = useDispatch();

  const loadCategories = useCallback(() => {
    dispatch(getCategoriesListTrigger());
  }, []);

  return {
    isLoading,
    loadCategories,
    categoriesList
  };
};
