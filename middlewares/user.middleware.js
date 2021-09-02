const ErrorHandler = require('../errors/ErrorHandler');
const { FORBIDDEN } = require('../configs/statusCodes.enum');
const { WRONG_ACCESS } = require('../configs/stringConstants');

const isUserAllowedForAction = (req, res, next) => {
    try {
        if (req.params.user_id !== req.currentUser._id.toString()) {
            throw new ErrorHandler(FORBIDDEN, WRONG_ACCESS);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isUserAllowedForAction
};
