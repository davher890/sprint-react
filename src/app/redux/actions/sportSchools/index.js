import { ADD_SPORTSCHOOL, LOAD_SPORTSCHOOLS, LOAD_SPORTSCHOOL_TABLE, GET_SPORTSCHOOL, DOWNLOAD_SPORTSCHOOLS } from "../../constants/action_types";

import { addData, findById, downloadExcel, findAll } from "../../../services/SportSchoolService"
import { findSportSchoolDataPagination } from "../../../services/TableService"

export function getSportSchoolTable(page, size, filters) {
    return function (dispatch) {
        return findSportSchoolDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_SPORTSCHOOL_TABLE, payload: json });
        });
    }
}

export function getAllSportSchools() {
    return function (dispatch) {
        return findAll().then(json => {
            dispatch({ type: LOAD_SPORTSCHOOLS, payload: json });
        });
    }
}

// export function getSportSchools() {
//     return function (dispatch) {
//         return findDataPagination().then(json => {
//             dispatch({ type: LOAD_SPORTSCHOOLS, payload: json });
//         });
//     }
// }

export function getSportSchool(id) {
    return function (dispatch) {
        return findById(id).then(json => {
            dispatch({ type: GET_SPORTSCHOOL, payload: json });
        });
    }
}

export function downloadSportSchools(columns) {
    return function (dispatch) {
        return downloadExcel(columns).then(json => {
            dispatch({ type: DOWNLOAD_SPORTSCHOOLS, payload: json });
        });
    }
}
export function addSportSchool(data) {
    return function (dispatch) {
        return addData(data).then(json => {
            dispatch({ type: ADD_SPORTSCHOOL, payload: json });
        });
    }
}