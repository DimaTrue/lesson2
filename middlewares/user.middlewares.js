const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../models');
const { BAD_REQUEST, NOT_FOUND } = require('../configs/statusCodes.enum');
const { USER_NOT_FOUND, WRONG_UPDATE_USER } = require('../configs/stringConstants');
const { updateUserValidator } = require('../validators');

const isUserByIdExist = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        const user = await User.findById(user_id);

        if (!user) {
            throw new ErrorHandler(NOT_FOUND, USER_NOT_FOUND);
        }

        req.user = user;

        next();
    } catch (err) {
        next(err);
    }
};

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

module.exports = {
    isUserByIdExist,
    isValidUserUpdateData
};
