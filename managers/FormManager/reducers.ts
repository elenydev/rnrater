import { FormsStore } from "./interfaces";
import FormManager from "./FormManager";
import { createSliceWithSaga } from "redux-toolkit-with-saga";

const initialState: FormsStore = {
  manager: new FormManager(),
};

const formManagerStore = createSliceWithSaga({
  name: "formsStore",
  initialState,
  reducers: {},
});

export default formManagerStore.reducer;
