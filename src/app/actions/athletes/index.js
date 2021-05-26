import { ADD_ATHLETE, GET_ATHLETE, GET_ATHLETES_FEE, DOWNLOAD_ATHLETES } from "../../constants/action_types";

import { addData, findById, findAthletesFee, downloadExcel } from "../../../services/AthleteService"

import utils from "../../../functions/Utils.js"
import moment from 'moment'

export function getAthlete(id) {
    return function (dispatch) {
        return findById(id).then(json => {
            json.age = utils.ageCalculator(new Date(json.birthDate));
            json.birthDate = moment(new Date(json.birthDate)).format("YYYY-MM-DD")
            dispatch({ type: GET_ATHLETE, payload: json });
        });
    }
}

export function getAthletesFee(data) {
    return function (dispatch) {
        return findAthletesFee(data).then(json => {
            dispatch({ type: GET_ATHLETES_FEE, payload: json });
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