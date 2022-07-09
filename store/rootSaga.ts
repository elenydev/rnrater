import categoryPostsSagas from "../components/CategoryPost/domain/sagas";
import { spawn } from "redux-saga/effects";
import userSagas from "../components/Auth/domain/sagas";
import categoriesSagas from "../components/Categories/domain/sagas";
import commentSagas from "../components/Comments/domain/sagas";

export default function* rootSaga() {
  yield spawn(userSagas);
  yield spawn(categoriesSagas);
  yield spawn(categoryPostsSagas);
  yield spawn(commentSagas)
}
