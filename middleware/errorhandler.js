const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
    // Use error status code or default to 500
    const status = err.statusCode ? err.statusCode : 500;

    // Check the status code and handle accordingly
    switch (status) {
        case constants.VALIDATION_ERROR:
            res.status(status).json({ "title": "Validation Failed", "message": err.message, "stackTrace": err.stack });
            break;
        case constants.NOT_FOUND:
            res.status(status).json({ "title": "Not Found", "message": err.message, "stackTrace": err.stack });
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
            res.status(500).json({ "title": "Internal Server Error", "message": err.message, "stackTrace": err.stack });
            break;
    }
};

module.exports = errorHandler;
