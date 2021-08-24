module.exports.renderErrorPage = (
    response,
    statusCode,
    errorMessage,
    link,
    title
) => {
    response.status(statusCode).render('errorPage', {
        errorMessage,
        link,
        title,
    });
};
