import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import sportSchoolReducer from "../reducers/sportSchools/index";
import athleteReducer from "../reducers/athletes/index";
import groupReducer from "../reducers/groups/index";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  // sportSchoolReducer,
  combineReducers({
    sport_school_reducer: sportSchoolReducer,
    athlete_reducer: athleteReducer,
    group_reducer: groupReducer
  }),
  storeEnhancers(applyMiddleware(thunk))
);
export default store;