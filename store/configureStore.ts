import { configureStore } from "@reduxjs/toolkit";
import userStore from "../components/Auth/domain/reducers";
import createSagaMiddleware from "redux-saga";
import userSagas from "../components/Auth/domain/sagas";
import formsStore from "../managers/FormManager/reducers";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userStore,
    formsStore,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(userSagas);

export default store;
