import * as ACTION_TYPES from "../../constants/action_types";

import { findTrainerDataPagination } from "../../../services/TableService"
import { findAll, addData, findById, downloadExcel, deleteTrainer } from "../../../services/TrainerService"

import { Order } from '../../../types/order'

export function getAllTrainers() {
    return function (dispatch: any)  {
        return findAll().then(json => { 
            dispatch({ type: ACTION_TYPES.LOAD_TRAINERS, payload: json }); 
        });
    }
}

export function getTrainerTable(page: number, size: number, filters: any, sort: string='name', sortDirection: Order='asc') {
    return function (dispatch: any)  {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return findTrainerDataPagination(page, size, filters, sort, sortDirection).then(json => {
            dispatch({ type: ACTION_TYPES.LOAD_TRAINER_TABLE, payload: json });
        });
    }
}

export function getTrainer(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: ACTION_TYPES.GET_TRAINER, payload: json });
        });
    }
}

export function downloadTrainers(columns: any) {
    return function (dispatch: any) {
        dispatch({ type: ACTION_TYPES.API_CALL})
        return downloadExcel(columns).then(json => {
            dispatch({ type: ACTION_TYPES.DOWNLOAD_TRAINERS, payload: json });
        });
    }
}

export function removeTrainer(id: number) {
    return function (dispatch: any)  {
        return deleteTrainer(id).then(json => {
            dispatch({ type: ACTION_TYPES.DELETE_TRAINER, payload: json });
        });
    }
}

export function addTrainer(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            if (!json.errorMessage) {
                json.successMessage = "Datos guardados!"
            }
            dispatch({ type: ACTION_TYPES.ADD_TRAINER, payload: json });
        });
    }
}