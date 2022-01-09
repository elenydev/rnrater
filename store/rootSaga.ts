import { spawn } from "redux-saga/effects";
import userSagas from "../components/Auth/domain/sagas";
import categoriesSagas from '../components/Categories/domain/sagas';


export default function* rootSaga( ) {
    yield spawn(userSagas)
    yield spawn(categoriesSagas)
}