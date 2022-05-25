import { LOAD_USER_TABLE, ADD_USER, GET_USER, CURRENT_USER_ID } from "../../constants/action_types";

import { findUserDataPagination } from "../../../services/TableService"
import { addData, changePassword, findById } from "../../../services/UserService"

import { getUserId } from "../../../services/LoginService";
import { Order } from '../../../types/order'

export function getUserTable(page: number, size: number, filters: any, sort: string, sortDirection: Order) {
    return function (dispatch: any)  {
        return findUserDataPagination(page, size, filters, sort, sortDirection).then(json => {
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

export function changeUserPassword(data: any) {
    return function (dispatch: any)  {
        return changePassword(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ADD_USER, payload: json });
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

export function getCurrentUser() {
    return function (dispatch: any)  {
        const id = getUserId()
        dispatch({ type: CURRENT_USER_ID, payload: id });
    }
}