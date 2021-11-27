import { UserStore } from "./interfaces";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import * as actions from "./actions";

const initialState: UserStore = {
  user: undefined,
  isLoading: false,
};

const userStore = createSliceWithSaga({
  name: "userStore",
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
      })
      .addCase(actions.createUserTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(actions.createUserFailure, (state: UserStore) => {
        state.isLoading = false;
      })
      .addCase(actions.createUserSuccess, (state: UserStore) => {
        state.isLoading = false;
      })
  },
  reducers: {},
});

export default userStore.reducer;
