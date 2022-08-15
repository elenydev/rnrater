import { createSliceWithSaga } from 'redux-toolkit-with-saga';
import { CommentStore } from './intefaces';
import * as actions from './actions';

const initialState: CommentStore = {
  paging: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0
  },
  isLoading: true,
  list: []
};

const commentStore = createSliceWithSaga({
  name: 'commentStore',
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
          state.list = [...state.list, ...action.payload.results!];
        }
      )
      .addCase(actions.updatePaging, (state: CommentStore, action) => {
        state.paging = {
          ...state.paging,
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageSize
        };
      })

      .addCase(actions.clearCommentsList, (state: CommentStore) => {
        state.list = [];
        state.paging = {
          pageNumber: 1,
          pageSize: 10,
          totalCount: 0
        };
      })

      .addCase(actions.addNewComment, (state: CommentStore, action) => {
        state.list = [action.payload, ...state.list];
        state.paging.totalCount = state.paging.totalCount + 1;
        state.paging.pageNumber =
          state.paging.pageNumber * state.paging.pageSize <
          state.paging.totalCount
            ? state.paging.pageNumber + 1
            : state.paging.pageNumber;
      });
  },
  reducers: {}
});

export default commentStore.reducer;
