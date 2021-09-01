const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../configs/statusCodes.enum');
const { WRONG_POST, WRONG_DATA } = require('../configs/stringConstants');
const { createPostValidator, updatePostValidator, userIdAndPostIdValidator } = require('../validators/post.validator');

const isValidPostData = (req, res, next) => {
    try {
        const { error } = createPostValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_POST} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isValidPostUpdate = (req, res, next) => {
    try {
        const { error } = updatePostValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_POST} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isCorrectPostIdAndUserIdParams = (req, res, next) => {
    try {
        const { error } = userIdAndPostIdValidator.validate(req.params);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, `${WRONG_DATA} ${error.details[0].message}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isValidPostData,
    isValidPostUpdate,
    isCorrectPostIdAndUserIdParams
};
