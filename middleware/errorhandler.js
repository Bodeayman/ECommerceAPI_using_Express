const constants = require("../constants")
const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    switch (status) {
        case constants.VALIDATION_ERROR:
            res.status(status).json({ "title": "Validation Failed", "message": err.message, "stackTrace": err.stack });
            break;
        case constants.NOT_FOUND:
            res.status(status).json({ "title": "Not found", "message": err.message, "stackTrace": err.stack });
            break;
        case constants.FORBIDDEN:
            res.status(status).json({ "title": "Forbidden Access", "message": err.message, "stackTrace": err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.status(status).json({ "title": "Unauthorized Access", "message": err.message, "stackTrace": err.stack });
            break;
        case constants.SERVER_ERROR:
            res.status(status).json({ "title": "Server Error", "message": err.message, "stackTrace": err.stack });
            break;
        default:
            console.log("No error at all");
            break;
    }
}

module.exports = errorHandler;