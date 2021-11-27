import { configureStore } from "@reduxjs/toolkit";
import userStore from "../components/Auth/domain/reducers";
import createSagaMiddleware from "redux-saga";
import userSagas from "../components/Auth/domain/sagas";


let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userStore,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(userSagas);

export default store;
