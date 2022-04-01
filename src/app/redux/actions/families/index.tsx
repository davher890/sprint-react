import * as ACTION_TYPES from "../../constants/action_types";

import { addData, findById } from "../../../services/FamilyService"
import { findFamilyDataPagination } from "../../../services/TableService"

import { Order } from '../../../types/order'

export function getFamilyTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any) {
        return findFamilyDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_FAMILY_TABLE, payload: json });
        });
    }
}

export function getFamily(id: number) {
    return function (dispatch: any) {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_FAMILY, payload: json });
        });
    }
}

export function addFamily(data: any) {
    return function (dispatch: any) {
        return addData(data).then(json => {
            dispatch({ type: ACTION_TYPES.ADD_FAMILY, payload: json });
        });
    }
}
