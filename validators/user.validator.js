const Joi = require('joi');
const {
    EMAIL_REGEXP, TEXT_REGEXP,
} = require('../configs/constants');

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().regex(TEXT_REGEXP).trim(),
    age: Joi.number().integer().min(6).max(110),
    email: Joi.string().regex(EMAIL_REGEXP).trim(),
});

module.exports = {
    updateUserValidator
};
