import * as ACTION_TYPES from "../../constants/action_types";

import { uploadLicenseFile } from "../../../services/LicenseService"

export function uploadLicenses(file: File) {
    return function (dispatch: any)  {
        return uploadLicenseFile(file).then(json => {
            dispatch({ type: ACTION_TYPES.UPLOAD_LICENSES, payload: json });
        });
    }
}