import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import sportSchoolReducer from "./sportSchools/index";
import athleteReducer from "./athletes/index";
import groupReducer from "./groups/index";
import scheduleReducer from "./schedules/index";
import trainerReducer from "./trainers/index";
import tableReducer from "./table/index";
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
