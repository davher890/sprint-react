import { LOAD_USER_TABLE, ADD_USER, GET_USER } from "../../constants/action_types";

import { findUserDataPagination } from "../../../services/TableService"
import { addData, findById } from "../../../services/UserService"


export function getUserTable(page: number, size: number, filters: any) {
    return function (dispatch: any)  {
        return findUserDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_USER_TABLE, payload: json });
        });
    }
}

export function getUser(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: GET_USER, payload: json });
        });
    }
}

export function addUser(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ADD_USER, payload: json });
        });
    }
}