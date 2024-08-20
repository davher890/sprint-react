import { publicPostRequest } from "./ApiService"

export const contactMail = (from: string, subject: string, message: string) => {
    return publicPostRequest("/contact/", {
        from: from,
        subject: subject,
        message: message
    })
}
