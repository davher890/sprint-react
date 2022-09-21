import * as ACTION_TYPES from "../../constants/action_types";

import { Order } from '../../../types/order'

import { addData, findById, findIncidenceComments  } from "../../../services/IncidenceService"
import { findIncidenceDataPagination } from "../../../services/TableService"

export function getIncidenceTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findIncidenceDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_INCIDENCE_TABLE, payload: json });
        });
    }
}

export function getIncidence(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_INCIDENCE, payload: json });
        });
    }
}

export function addIncidence(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_INCIDENCE, payload: json });
        });
    }
}

export function getIncidenceComments(id: number) {
    return function (dispatch: any) {
        return findIncidenceComments(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_INCIDENCE_COMMENTS, payload: json });
        });
    }
}
