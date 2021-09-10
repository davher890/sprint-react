import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import sportSchoolReducer from "../reducers/sportSchools/index";
import athleteReducer from "../reducers/athletes/index";
import groupReducer from "../reducers/groups/index";
import scheduleReducer from "../reducers/schedules/index";
import trainerReducer from "../reducers/trainers/index";
import tableReducer from "../reducers/table/index";
import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    sport_school_reducer: sportSchoolReducer,
    athlete_reducer: athleteReducer,
    group_reducer: groupReducer,
    schedule_reducer: scheduleReducer,
    trainer_reducer: trainerReducer,
    table_reducer: tableReducer
  }),
  storeEnhancers(applyMiddleware(thunk))
);
