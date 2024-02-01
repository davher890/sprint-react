import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import apiReducer from "./api/index";
import authReducer from "./authentication/index";
import athleteReducer from "./athletes/index";
import incidenceReducer from "./incidences/index";
import licenseReducer from "./licenses/index";
import feeReducer from "./fees/index";
import feeTypeReducer from "./feeTypes/index";
import groupReducer from "./groups/index";
import receiptReducer from "./receipts/index";
import scheduleReducer from "./schedules/index";
import sportSchoolReducer from "./sportSchools/index";
import tableReducer from "./table/index";
import trainerReducer from "./trainers/index";
import userReducer from "./users/index";

import thunk from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    api_reducer: apiReducer,
    auth_reducer: authReducer,
    athlete_reducer: athleteReducer,
    incidence_reducer: incidenceReducer,
    license_reducer: licenseReducer,
    fee_reducer: feeReducer,
    group_reducer: groupReducer,
    feeTypeReducer: feeTypeReducer,
    receipt_reducer: receiptReducer,
    schedule_reducer: scheduleReducer,
    sport_school_reducer: sportSchoolReducer,
    table_reducer: tableReducer,
    trainer_reducer: trainerReducer,
    user_reducer: userReducer
  }),
  storeEnhancers(applyMiddleware(thunk))
);
