const ErrorHandler = require('../errors/ErrorHandler');
const { Post } = require('../models');
const { BAD_REQUEST, NOT_FOUND } = require('../configs/statusCodes.enum');
const { WRONG_POST, POST_NOT_FOUND, WRONG_DATA } = require('../configs/stringConstants');
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

const isPostByIdExist = async (req, res, next) => {
    try {
        const { post_id } = req.params;

        const post = await Post.findById(post_id);

        if (!post) {
            throw new ErrorHandler(NOT_FOUND, POST_NOT_FOUND);
        }

        req.post = post;

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
    isPostByIdExist,
    isCorrectPostIdAndUserIdParams
};
