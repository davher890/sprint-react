import * as ACTION_TYPES from "../../constants/action_types";

import { addData, findById, downloadExcel, findAll, findFeeTypesById, deleteSportSchool } from "../../../services/SportSchoolService"
import { findSportSchoolDataPagination } from "../../../services/TableService"

import { Order } from '../../../types/order'

export function getSportSchoolTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any)  {
        return findSportSchoolDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_SPORTSCHOOL_TABLE, payload: json });
        });
    }
}

export function getAllSportSchools() {
    return function (dispatch: any)  {
        return findAll().then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_SPORTSCHOOLS, payload: json });
        });
    }
}

export function getSportSchoolFeeTypes(id: number) {
    return function (dispatch: any)  {
        return findFeeTypesById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_SPORTSCHOOL_FEE_TYPES, payload: json });
        });
    }
}

export function getSportSchool(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_SPORTSCHOOL, payload: json });
        });
    }
}

export function downloadSportSchools(columns: any, filters:any) {
    return function (dispatch: any)  {
        return downloadExcel(columns, filters, "/sport_schools/excel").then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_SPORTSCHOOLS, payload: json });
        });
    }
}
export function addSportSchool(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_SPORTSCHOOL, payload: json });
        });
    }
}

export function removeSportSchool(id: number) {
    return function (dispatch: any)  {
        return deleteSportSchool(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_SPORTSCHOOL, payload: json });
        });
    }
}
