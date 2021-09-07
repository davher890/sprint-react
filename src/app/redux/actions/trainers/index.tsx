import { LOAD_TRAINERS, LOAD_TRAINER_TABLE } from "../../constants/action_types";

import { findTrainerDataPagination } from "../../../services/TableService"
import { findAll } from "../../../services/TrainerService"

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