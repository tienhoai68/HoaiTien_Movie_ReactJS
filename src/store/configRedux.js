import { combineReducers, legacy_createStore } from "redux"
import { userReducer } from "./reducers/userReducer";
import { userAdminReducer } from "./reducers/userAdminReducer";
import { filmsReducer } from "./reducers/filmReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  userAdminReducer: userAdminReducer,
  filmsReducer: filmsReducer,
  
});

export const store = legacy_createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
