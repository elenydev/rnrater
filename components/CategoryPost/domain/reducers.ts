import { CategoryPostsStore } from './interfaces';
import { createSliceWithSaga } from 'redux-toolkit-with-saga';
import * as actions from './actions';

const initialState: CategoryPostsStore = {
  paging: {
    pageNumber: 1,
    pageSize: 10
  },
  isLoading: false,
  list: []
};

const categoryPostsStore = createSliceWithSaga({
  name: 'categoryPostsStore',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCategoryPostsTrigger, (state: CategoryPostsStore) => {
        state.isLoading = true;
      })
      .addCase(
        actions.getCategoryPostsSuccess,
        (state: CategoryPostsStore, action) => {
          state.paging = action.payload.paging!;
        }
      )
      .addCase(actions.getCategoryPostsFailure, (state: CategoryPostsStore) => {
        state.isLoading = false;
      })

      .addCase(
        actions.getCategoryPostsImagesTrigger,
        (state: CategoryPostsStore) => {
          state.isLoading = true;
        }
      )

      .addCase(
        actions.getCategoryPostsImagesSuccess,
        (state: CategoryPostsStore, action) => {
          state.isLoading = false;
          state.list = action.payload;
        }
      )

      .addCase(
        actions.getCategoryPostsImagesFailure,
        (state: CategoryPostsStore) => {
          state.isLoading = false;
        }
      )

      .addCase(
        actions.setCurrentCategoryPost,
        (state: CategoryPostsStore, action) => {
          state.currentCategoryPost = action.payload;
        }
      )

      .addCase(actions.getCategoryPostTrigger, (state: CategoryPostsStore) => {
        state.isLoading = true;
      })

      .addCase(actions.getCategoryPostFailure, (state: CategoryPostsStore) => {
        state.isLoading = false;
      })

      .addCase(
        actions.getCategoryPostImageTrigger,
        (state: CategoryPostsStore) => {
          state.isLoading = true;
        }
      )

      .addCase(
        actions.getCategoryPostImageSuccess,
        (state: CategoryPostsStore, action) => {
          state.isLoading = true;
          state.currentCategoryPost = action.payload;
        }
      )

      .addCase(
        actions.getCategoryPostImageFailure,
        (state: CategoryPostsStore) => {
          state.isLoading = false;
        }
      );
  },
  reducers: {}
});

export default categoryPostsStore.reducer;
