import { LOAD_TRAINERS, LOAD_TRAINER_TABLE } from "../../constants/action_types";

import { findTrainerDataPagination } from "../../../services/TableService"
import { findAll } from "../../../services/TrainerService"

export function getTrainers() {
    return function (dispatch) {
        return findAll().then(json => { dispatch({ type: LOAD_TRAINERS, payload: json }); });
    }
}

export function getTrainerTable(page, size, filters) {
    return function (dispatch) {
        return findTrainerDataPagination(page, size, filters).then(json => {
            dispatch({ type: LOAD_TRAINER_TABLE, payload: json });
        });
    }
}