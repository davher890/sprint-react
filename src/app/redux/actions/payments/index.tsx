import { DOWNLOAD_PAYMENTS } from "../../constants/action_types";

import { downloadPaymentsExcel} from "../../../services/PaymentService"

export function downloadAthletesPayments() {
    return function (dispatch: any) {
        return downloadPaymentsExcel().then(json => {
            dispatch({ type: DOWNLOAD_PAYMENTS, payload: json });
        });
    }
}
