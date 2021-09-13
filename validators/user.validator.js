const Joi = require('joi');

const { constants } = require('../configs');

const idSubScheme = Joi.string().min(24).max(24).trim()
    .required();

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().regex(constants.TEXT_REGEXP).trim(),
    age: Joi.number().integer().min(6).max(110),
    email: Joi.string().regex(constants.EMAIL_REGEXP).trim(),
});

const userIdParamsValidator = Joi.object({
    user_id: idSubScheme
});

const getUsersQueryValidator = Joi.object({
    page: Joi.string().trim().required(),
    perPage: Joi.string().trim().required()
});

module.exports = {
    getUsersQueryValidator,
    updateUserValidator,
    userIdParamsValidator,
    idSubScheme
};
