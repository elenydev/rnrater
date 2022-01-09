import { CategoriesStore } from "./interfaces";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import * as actions from "./actions";

const initialState: CategoriesStore = {
  paging: {
    pageNumber: 1,
    pageSize: 10,
  },
  isLoading: true,
  list: [],
};

const categoriesStore = createSliceWithSaga({
  name: "categoriesStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCategoriesListTrigger, (state: CategoriesStore) => {
        state.isLoading = true;
      })
      .addCase(actions.getCategoriesListSuccess, (state: CategoriesStore, action) => {
        state.list = action.payload.results!;
        state.paging = action.payload.paging!;
        state.isLoading = false;
      })
      .addCase(actions.getCategoriesListFailure, (state: CategoriesStore) => {
        state.isLoading = false;
      });
  },
  reducers: {},
});

export default categoriesStore.reducer;
