import { ADD_ATHLETE, GET_ATHLETE, GET_ATHLETE_FEE, 
    DOWNLOAD_ATHLETES, LOAD_ATHLETE_TABLE, 
    LOAD_HISTORIC_TABLE, 
    LOAD_ATHLETE_SPORTDATA_TABLE,
    ADD_ATHLETE_SPORTDATA} from "../../constants/action_types";

import { addData, findById, findAthleteFee, downloadExcel, addAthleteSportdata } from "../../../services/AthleteService"
import { findHistoricDataPagination, findAthleteDataPagination, findAthleteSportdataPagination } from "../../../services/TableService"

import utils from "../../../utils/Functions"
import moment from 'moment'

export function getAthleteTable(page, size, filters) {
    return function (dispatch) {
        return findAthleteDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_ATHLETE_TABLE, payload: json });
        });
    }
}

export function getAthleteTableSportdataTable(athleteId, page, size, filters) {
    return function (dispatch) {
        return findAthleteSportdataPagination(athleteId, page, size, filters).then(json => {
            dispatch({ type: LOAD_ATHLETE_SPORTDATA_TABLE, payload: json });
        });
    }
}

export function getHistoricTable(page, size, filters) {
    return function (dispatch) {
        return findHistoricDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_HISTORIC_TABLE, payload: json });
        });
    }
}

export function getAthlete(id) {
    return function (dispatch) {
        return findById(id).then(json => {
            json.age = utils.ageCalculator(new Date(json.birthDate));
            json.birthDate = moment(new Date(json.birthDate)).format("YYYY-MM-DD")
            dispatch({ type: GET_ATHLETE, payload: json });
        });
    }
}

export function getAthleteFee(data) {
    return function (dispatch) {
        return findAthleteFee(data).then(json => {
            dispatch({ type: GET_ATHLETE_FEE, payload: json });
        });
    }
}

export function downloadAthletes(columns) {
    return function (dispatch) {
        return downloadExcel(columns).then(json => {
            dispatch({ type: DOWNLOAD_ATHLETES, payload: json });
        });
    }
}
export function addAthlete(data) {
    return function (dispatch) {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Atleta guardado!"
            }
            dispatch({ type: ADD_ATHLETE, payload: json });
        });
    }
}

// Sportdata

export function addSportdata(data) {
    console.log(data)
    return function (dispatch) {
        return addAthleteSportdata(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos deportivos guardado!"
            }
            dispatch({ type: ADD_ATHLETE_SPORTDATA, payload: json });
        });
    }
}