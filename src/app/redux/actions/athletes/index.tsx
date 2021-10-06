import { ADD_ATHLETE, GET_ATHLETE, GET_ATHLETE_FEE, GET_ATHLETES_BY_PHONE,
    DOWNLOAD_ATHLETES, LOAD_ATHLETE_TABLE, 
    LOAD_HISTORIC_TABLE, 
    LOAD_ATHLETE_SPORTDATA_TABLE,
    ADD_ATHLETE_SPORTDATA,
    LOAD_DUPLICATED_ATHLETES_TABLE,
    DOWNLOAD_HISTORIC,
    GET_ATHLETES_BY_SURNAMES} from "../../constants/action_types";

import { addData, findById, findAthleteFee, downloadExcel, addAthleteSportdata, findByPhone, findBySurnames, registerAthlete, unregisterAthlete } from "../../../services/AthleteService"
import { findHistoricDataPagination, findAthleteDataPagination, findAthleteSportdataPagination, findDuplicatedAthletesDataPagination } from "../../../services/TableService"

import utils from "../../../utils/Functions"
import moment from 'moment'

export function getAthleteTable(page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findAthleteDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_ATHLETE_TABLE, payload: json });
        });
    }
}

export function getDuplicatedAthletesTable(id: number, name: string, firstSurname: string, dni: string, page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findDuplicatedAthletesDataPagination(id, name, firstSurname, dni, page, size, filters).then(json => {
            dispatch({ type: LOAD_DUPLICATED_ATHLETES_TABLE, payload: json });
        });
    }
}

export function getAthleteTableSportdataTable(athleteId: number, page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findAthleteSportdataPagination(athleteId, page, size, filters).then(json => {
            dispatch({ type: LOAD_ATHLETE_SPORTDATA_TABLE, payload: json });
        });
    }
}

export function getHistoricTable(page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findHistoricDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_HISTORIC_TABLE, payload: json });
        });
    }
}

export function getAthlete(id: number) {
    return function (dispatch: any) {
        return findById(id).then(json => {
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: GET_ATHLETE, payload: json });
        });
    }
}

export function getAthletesByPhone(phoneList: string[]) {
    return function (dispatch: any) {
        return findByPhone(phoneList).then(json => {
            dispatch({ type: GET_ATHLETES_BY_PHONE, payload: json });
        });
    }
}

export function getAthletesBySurnames(firstSurname: string, secondSurname: string) {
    return function (dispatch: any) {
        return findBySurnames(firstSurname, secondSurname).then(json => {
            dispatch({ type: GET_ATHLETES_BY_SURNAMES, payload: json });
        });
    }
}

export function getAthleteFee(data: any) {
    return function (dispatch: any) {
        return findAthleteFee(data).then(json => {
            dispatch({ type: GET_ATHLETE_FEE, payload: json });
        });
    }
}

export function downloadAthletes(columns: any) {
    return function (dispatch: any) {
        return downloadExcel(columns).then(json => {
            dispatch({ type: DOWNLOAD_ATHLETES, payload: json });
        });
    }
}

export function downloadHistoricAthletes(columns: any) {
    return function (dispatch: any) {
        return downloadExcel(columns, "/athletes/historic/excel").then(json => {
            dispatch({ type: DOWNLOAD_HISTORIC, payload: json });
        });
    }
}

export function doRegisterAthlete(id: number) {
    return function (dispatch: any) {
        return registerAthlete(id).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ADD_ATHLETE, payload: json });
        });
    }
}

export function doUnregisterAthlete(id: number) {
    return function (dispatch: any) {
        return unregisterAthlete(id).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ADD_ATHLETE, payload: json });
        });
    }
}

export function addAthlete(data: any) {
    return function (dispatch: any) {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ADD_ATHLETE, payload: json });
        });
    }
}

// Sportdata

export function addSportdata(data: any) {
    console.log(data)
    return function (dispatch: any) {
        return addAthleteSportdata(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos deportivos guardados!"
            }
            dispatch({ type: ADD_ATHLETE_SPORTDATA, payload: json });
        });
    }
}