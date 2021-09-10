import { LOAD_TRAINERS, LOAD_TRAINER_TABLE, ADD_TRAINER, GET_TRAINER } from "../../constants/action_types";

import { findTrainerDataPagination } from "../../../services/TableService"
import { findAll, addData, findById } from "../../../services/TrainerService"

export function getTrainers() {
    return function (dispatch: any)  {
        return findAll().then(json => { dispatch({ type: LOAD_TRAINERS, payload: json }); });
    }
}

export function getTrainerTable(page: number, size: number, filters: any) {
    return function (dispatch: any)  {
        return findTrainerDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_TRAINER_TABLE, payload: json });
        });
    }
}

export function getTrainer(id: number) {
    return function (dispatch: any)  {
        return findById(id).then(json => {
            dispatch({ type: GET_TRAINER, payload: json });
        });
    }
}

export function addTrainer(data: any) {
    return function (dispatch: any)  {
        return addData(data).then(json => {
            dispatch({ type: ADD_TRAINER, payload: json });
        });
    }
}