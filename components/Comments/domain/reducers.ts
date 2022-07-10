import { createSliceWithSaga } from "redux-toolkit-with-saga";
import { CommentStore } from "./intefaces";

const initialState: CommentStore = {
  paging: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
  },
  isLoading: true,
};

const commentStore = createSliceWithSaga({
  name: "commentStore",
  initialState,
  extraReducers: (builder) => {
    builder;
  },
  reducers: {},
});

export default commentStore.reducer;
