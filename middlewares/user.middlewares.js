const ErrorHandler = require('../errors/ErrorHandler');
const { strings, statusCodes } = require('../configs');

const isUserAllowedForAction = (req, res, next) => {
    try {
        if (req.params.user_id !== req.currentUser._id.toString()) {
            throw new ErrorHandler(statusCodes.FORBIDDEN, strings.WRONG_ACCESS);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isUserAllowedForAction
};
