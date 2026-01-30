// групування констант
// enumarable
var HTTPstatusCode;
(function (HTTPstatusCode) {
    HTTPstatusCode[HTTPstatusCode["OK"] = 200] = "OK";
    HTTPstatusCode[HTTPstatusCode["Created"] = 201] = "Created";
    HTTPstatusCode[HTTPstatusCode["BadRequest"] = 400] = "BadRequest";
    HTTPstatusCode[HTTPstatusCode["Unauthorized"] = 401] = "Unauthorized";
    HTTPstatusCode[HTTPstatusCode["Forbidden"] = 403] = "Forbidden";
    HTTPstatusCode[HTTPstatusCode["NotFound"] = 404] = "NotFound";
    HTTPstatusCode[HTTPstatusCode["InternalServerError"] = 500] = "InternalServerError";
    HTTPstatusCode[HTTPstatusCode["Success"] = 200] = "Success";
    HTTPstatusCode[HTTPstatusCode["AuthError"] = 401] = "AuthError";
    HTTPstatusCode[HTTPstatusCode["ServerError"] = 500] = "ServerError";
})(HTTPstatusCode || (HTTPstatusCode = {}));
HTTPstatusCode.InternalServerError;
export {};
// числові енами краще не використовувати -- можна, наприклад, навести на InternalServerError, там буде 405
