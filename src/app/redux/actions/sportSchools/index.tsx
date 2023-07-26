import * as ACTION_TYPES from "../../constants/action_types";

import { addData, findById, downloadExcel, findAll, findFeeTypesById, findCollectionsById, deleteSportSchool, findSportSchoolFee, findSportSchoolsGroups, findSportSchoolGroups, findSportSchoolTrainers } from "../../../services/SportSchoolService"
import { findSportSchoolDataPagination } from "../../../services/TableService"

import { Order } from '../../../types/order'

export function getSportSchoolTable(page: number, size: number, filters: any, sort: string='name', sortDirection: Order='asc') {
    return function (dispatch: any)  {
        dispatch({ type: ACTION_TYPES.API_CALL})
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

export function getSportSchoolCollections(id: number) {
    return function (dispatch: any)  {
        return findCollectionsById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_SPORTSCHOOL_COLLECTIONS, payload: json });
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

export function getSportSchoolGroups(id: number) {
    return function (dispatch: any)  {
        return findSportSchoolGroups(id)
            .then(json => { 
                dispatch({ type: ACTION_TYPES.GET_SPORT_SCHOOL_GROUPS, payload: json })
            })
    }
}

export function getSportSchoolFee(id: number) {
    return function (dispatch: any)  {
        return findSportSchoolFee(id)
            .then(json => { 
                dispatch({ type: ACTION_TYPES.GET_SPORT_SCHOOL_FEE, payload: json })
            })
    }
}

export function getSportSchoolsGroups(ids: number[]) {
    return function (dispatch: any)  {
        return findSportSchoolsGroups(ids)
            .then(json => { 
                dispatch({ type: ACTION_TYPES.GET_SPORT_SCHOOLS_GROUPS, payload: json})
            })
    }
}

export function getSportSchoolTrainers(id: number) {
    return function (dispatch: any)  {
        return findSportSchoolTrainers(id)
            .then(json => { dispatch({ type: ACTION_TYPES.LOAD_TRAINERS, payload: json }); })
    }
}

export function downloadSportSchools(columns: any, filters:any) {
    return function (dispatch: any)  {
        dispatch({ type: ACTION_TYPES.API_CALL})
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
