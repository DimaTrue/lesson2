const Joi = require('joi');

const { idSubScheme } = require('./user.validator');

const postIdParamsValidator = Joi.object({
    post_id: idSubScheme
});

const createPostValidator = Joi.object({
    title: Joi.string().min(2).max(30).trim()
        .required(),
    content: Joi.string().min(2).trim()
        .required(),
});

const updatePostValidator = Joi.object({
    title: Joi.string().min(2).max(30).trim(),
    content: Joi.string().min(2).trim(),
});

const userIdAndPostIdValidator = Joi.object({
    user_id: idSubScheme,
    post_id: idSubScheme,
});

module.exports = {
    createPostValidator,
    updatePostValidator,
    userIdAndPostIdValidator,
    postIdParamsValidator
};
