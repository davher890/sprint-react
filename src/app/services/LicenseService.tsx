import { uploadExcelFile } from "./ApiService"

export const uploadLicenseFile = (file: File) => {
    return uploadExcelFile("/licenses", file)
}
