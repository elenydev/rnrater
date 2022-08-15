import { UserStore } from './interfaces';
import { createSliceWithSaga } from 'redux-toolkit-with-saga';
import * as actions from './actions';
import { User } from 'infrastructure/models/User';

const initialState: UserStore = {
  user: undefined,
  isLoading: false
};

const userStore = createSliceWithSaga({
  name: 'userStore',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(actions.authenticateUserTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(actions.authenticateUserSuccess, (state: UserStore, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(actions.authenticateUserFailure, (state: UserStore) => {
        state.isLoading = false;
      });

    builder
      .addCase(actions.getUserAvatarTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(actions.getUserAvatarSuccess, (state: UserStore, action) => {
        state.user = {
          ...(state.user as User),
          avatar: action.payload as unknown as Blob
        };
        state.isLoading = false;
      })
      .addCase(actions.getUserAvatarFailure, (state: UserStore) => {
        state.isLoading = false;
      });

    builder
      .addCase(actions.createUserTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(actions.createUserFailure, (state: UserStore) => {
        state.isLoading = false;
      })
      .addCase(actions.createUserSuccess, (state: UserStore) => {
        state.isLoading = false;
      });
  },
  reducers: {}
});

export default userStore.reducer;
