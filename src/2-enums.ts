// групування констант
// enumarable

enum HTTPstatusCode {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    Success = OK,
    AuthError = Unauthorized,
    ServerError = InternalServerError
}

HTTPstatusCode.InternalServerError;

enum HttpStatusIcon {
    Created = 'icon-created',
    Unauthorized = 'icon-unauth',
    NotFound = 'icon-notfound'
}

// числові енами краще не використовувати -- можна, наприклад, навести на InternalServerError, там буде 405

function getIconByCode(code: HTTPstatusCode): HttpStatusIcon {
    switch(code) {
        case HTTPstatusCode.Created:
            return HttpStatusIcon.Created;
        case HTTPstatusCode.Unauthorized:
            return HttpStatusIcon.Unauthorized;
        default:
            return HttpStatusIcon.NotFound;
    }

}

// read only variable
const statuses = {
    ok: 200,
    error: 400,
} as const;

