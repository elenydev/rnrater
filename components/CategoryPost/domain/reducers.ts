import { CategoryPostsStore } from "./interfaces";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import * as actions from "./actions";

const initialState: CategoryPostsStore = {
  paging: {
    pageNumber: 1,
    pageSize: 10,
  },
  isLoading: true,
  list: [],
};

const categoryPostsStore = createSliceWithSaga({
  name: "categoryPostsStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCategoryItemsTrigger, (state: CategoryPostsStore) => {
        state.isLoading = true;
      })
      .addCase(
        actions.getCategoryItemsSuccess,
        (state: CategoryPostsStore, action) => {
          state.paging = action.payload.paging!;
        }
      )
      .addCase(actions.getCategoryItemsFailure, (state: CategoryPostsStore) => {
        state.isLoading = false;
      })
  },
  reducers: {},
});

export default categoryPostsStore.reducer;
