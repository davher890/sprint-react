import { LOAD_FAMILY_TABLE, GET_FAMILY, ADD_FAMILY } from "../../constants/action_types";

import { addData, findById } from "../../../services/FamilyService"
import { findFamilyDataPagination } from "../../../services/TableService"

export function getFamilyTable(page: number, size: number, filters: any) {
    return function (dispatch: any) {
        return findFamilyDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_FAMILY_TABLE, payload: json });
        });
    }
}

export function getFamily(id: number) {
    return function (dispatch: any) {
        return findById(id).then(json => {
            dispatch({ type: GET_FAMILY, payload: json });
        });
    }
}

export function addFamily(data: any) {
    return function (dispatch: any) {
        return addData(data).then(json => {
            dispatch({ type: ADD_FAMILY, payload: json });
        });
    }
}
