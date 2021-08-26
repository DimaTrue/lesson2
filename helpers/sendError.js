module.exports.sendError = (
    response,
    statusCode,
    errorMessage
) => {
    response.status(statusCode).json(errorMessage);
};
