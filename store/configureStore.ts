import { configureStore } from '@reduxjs/toolkit';
import userStore from '../components/Auth/domain/reducers';
import createSagaMiddleware from 'redux-saga';
import formsStore from '../managers/FormManager/reducers';
import historyStore from '../managers/HistoryManager/reducers';
import categoriesStore from '../components/Categories/domain/reducers';
import categoryPostsStore from '../components/CategoryPost/domain/reducers';
import rootSaga from './rootSaga';
import commentStore from '../components/Comments/domain/reducers';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userStore,
    formsStore,
    historyStore,
    categoriesStore,
    categoryPostsStore,
    commentStore
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
