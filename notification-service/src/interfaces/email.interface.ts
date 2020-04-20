declare namespace IEmailRequest {

    interface ISingleEmail {
        message: string,
        destination: string,
        subject: string,
        isFailureEmail?: boolean
    }
}