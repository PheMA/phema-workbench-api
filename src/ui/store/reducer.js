import { combineReducers } from "redux";

import phenotypesReducer from "./phenotypes/reducer";

const rootReducer = combineReducers({
  phenotypes: phenotypesReducer
});

export default rootReducer;
