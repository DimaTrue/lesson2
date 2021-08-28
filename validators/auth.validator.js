const Joi = require('joi');
const roles = require('../configs/user-roles.enum');
const {
    EMAIL_REGEXP, PASSWORD_REGEXP, TEXT_REGEXP,
} = require('../configs/constants');

const signupValidator = Joi.object({
    name: Joi.string().alphanum().regex(TEXT_REGEXP).trim()
        .required(),
    age: Joi.number().integer().min(6).max(110)
        .required(),
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().alphanum().regex(PASSWORD_REGEXP).trim()
        .required(),
    role: Joi.string().allow(...Object.values(roles)).trim()
});

const loginValidator = Joi.object({
    email: Joi.string().regex(EMAIL_REGEXP).trim().required(),
    password: Joi.string().alphanum().regex(PASSWORD_REGEXP).trim()
        .required(),
    role: Joi.string().allow(...Object.values(roles)).trim()
});

module.exports = {
    signupValidator,
    loginValidator
};
