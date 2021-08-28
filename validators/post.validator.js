const Joi = require('joi');

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

module.exports = {
    createPostValidator,
    updatePostValidator
};
