import * as ACTION_TYPES from "../../constants/action_types";

import { addData, findById, findAthleteFee, downloadExcel, findByPhone, findBySurnames, registerAthlete, unregisterAthlete, findAthleteObservations, findAthleteReceipts, findAthleteHistoric, deleteAthlete } from "../../../services/AthleteService"
import { findHistoricDataPagination, findPaymentAthleteDataPagination, findAthleteDataPagination, findAthleteSportdataPagination, findDuplicatedAthletesDataPagination } from "../../../services/TableService"

import utils from "../../../utils/Functions"
import moment from 'moment'

import { Order } from '../../../types/order'

export function getPaymentAthleteTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findPaymentAthleteDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_PAYMENT_ATHLETE_TABLE, payload: json });
        });
    }
}

export function getAthleteTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findAthleteDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_ATHLETE_TABLE, payload: json });
        });
    }
}

export function getDuplicatedAthletesTable(id: number, name: string, firstSurname: string, dni: string, page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findDuplicatedAthletesDataPagination(id, name, firstSurname, dni, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_DUPLICATED_ATHLETES_TABLE, payload: json });
        });
    }
}

export function getAthleteTableSportdataTable(athleteId: number, page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findAthleteSportdataPagination(athleteId, page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_ATHLETE_SPORTDATA_TABLE, payload: json });
        });
    }
}

export function getHistoricTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findHistoricDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_HISTORIC_TABLE, payload: json });
        });
    }
}

export function getAthlete(id: number) {
    return function (dispatch: any) {
        return findById(id).then(json => {
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ACTION_TYPES.GET_ATHLETE, payload: json });
        });
    }
}

export function getAthletesByPhone(phoneList: string[]) {
    return function (dispatch: any) {
        return findByPhone(phoneList).then(json => {
            dispatch({ type: ACTION_TYPES.GET_ATHLETES_BY_PHONE, payload: json });
        });
    }
}

export function getAthletesBySurnames(firstSurname: string, secondSurname: string) {
    return function (dispatch: any) {
        return findBySurnames(firstSurname, secondSurname).then(json => {
            dispatch({ type: ACTION_TYPES.GET_ATHLETES_BY_SURNAMES, payload: json });
        });
    }
}

export function getAthleteFee(data: any) {
    return function (dispatch: any) {
        return findAthleteFee(data).then(json => {
            dispatch({ type: ACTION_TYPES.GET_ATHLETE_FEE, payload: json });
        });
    }
}

export function getAthleteObservations(id: number) {
    return function (dispatch: any) {
        return findAthleteObservations(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_ATHLETE_OBSERVATIONS, payload: json });
        });
    }
}

export function getAthleteReceipts(id: number) {
    return function (dispatch: any) {
        return findAthleteReceipts(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_ATHLETE_RECEIPTS, payload: json });
        });
    }
}

export function getAthleteHistoric(id: number) {
    return function (dispatch: any) {
        return findAthleteHistoric(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_ATHLETE_HISTORIC, payload: json });
        });
    }
}

export function downloadAthletes(columns: any, filters:any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadExcel(columns, filters, "/registered_athletes/excel").then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_ATHLETES, payload: json });
        });
    }
}

export function downloadPaymentAthletes(columns: any, filters:any, concept: string) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadExcel(columns, filters, "/payment_athletes/excel?concept=" + concept).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_ATHLETES, payload: json });
        });
    }
}

export function downloadHistoricAthletes(columns: any, filters: any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadExcel(columns, filters, "/unregistered_athletes/excel").then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_HISTORIC, payload: json });
        });
    }
}

export function doRegisterAthlete(id: number, body: any) {
    return function (dispatch: any) {
        return registerAthlete(id, body).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ACTION_TYPES.ADD_ATHLETE, payload: json });
        });
    }
}

export function doUnregisterAthlete(id: number, body: any) {
    return function (dispatch: any) {
        return unregisterAthlete(id, body).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ACTION_TYPES.ADD_ATHLETE, payload: json });
        });
    }
}

export function addAthlete(data: any) {
    return function (dispatch: any) {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            json.exit = data.exit
            json.age = utils.ageCalculator(json.birthDate);
            json.birthDateStr = moment.unix(json.birthDate/1000).format("YYYY-MM-DD")
            dispatch({ type: ACTION_TYPES.ADD_ATHLETE, payload: json });
        });
    }
}

export function removeAthlete(id: number) {
    return function (dispatch: any)  {
        return deleteAthlete(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_ATHLETE, payload: json });
        });
    }
}