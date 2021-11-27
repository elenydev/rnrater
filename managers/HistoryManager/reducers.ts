import { HistoryStore } from "./interfaces";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import * as actions from "./actions";

const initialState: HistoryStore = {
  manager: undefined,
};

const historyManagerStore = createSliceWithSaga({
  name: "historyStore",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      actions.setHistoryManager,
      (state: HistoryStore, action) => {
        state.manager = action.payload;
      }
    );
  },
});

export default historyManagerStore.reducer;
