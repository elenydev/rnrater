import { createSliceWithSaga } from "redux-toolkit-with-saga";
import { CommentStore } from "./intefaces";
import * as actions from "./actions";

const initialState: CommentStore = {
  paging: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
  },
  isLoading: true,
  list: [],
};

const commentStore = createSliceWithSaga({
  name: "commentStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCommentsListTrigger, (state: CommentStore) => {
        state.isLoading = true;
      })
      .addCase(actions.getCommentsListFailure, (state: CommentStore) => {
        state.isLoading = false;
      })
      .addCase(
        actions.getCommentsListSuccess,
        (state: CommentStore, action) => {
          state.isLoading = false;
          state.paging = action.payload.paging!;
          state.list = action.payload.results!;
        }
      );
  },
  reducers: {},
});

export default commentStore.reducer;
