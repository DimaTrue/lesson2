const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { WRONG_DATA, WRONG_UPDATE_USER, } = require('../configs/stringConstants');
const { updateUserValidator, userIdParamsValidator } = require('../validators');

const isValidUserUpdateData = (req, res, next) => {
    try {
        const { error } = updateUserValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_UPDATE_USER} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isCorrectUserIdParams = (req, res, next) => {
    try {
        const { error } = userIdParamsValidator.validate(req.params);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_DATA} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isValidUserUpdateData,
    isCorrectUserIdParams
};
