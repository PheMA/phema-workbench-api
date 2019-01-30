import { createStore, applyMiddleware, compose } from "redux";
import { all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import phenotypesSaga from "./phenotypes/saga";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        maxAge: 1000
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Combine and run sagas
function* rootSaga() {
  yield all([phenotypesSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
