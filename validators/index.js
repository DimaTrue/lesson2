const {
    confirmAdminValidatorBody,
    confirmValidator,
    forgotValidator,
    resetValidatorBody,
    resetValidatorQuery,
    loginValidator,
    signupValidator
} = require('./auth.validator');
const { updateUserValidator, userIdParamsValidator } = require('./user.validator');
const {
    createPostValidator, postIdParamsValidator, updatePostValidator, userIdAndPostIdValidator
} = require('./post.validator');

module.exports = {
    confirmAdminValidatorBody,
    confirmValidator,
    createPostValidator,
    forgotValidator,
    loginValidator,
    postIdParamsValidator,
    resetValidatorBody,
    resetValidatorQuery,
    signupValidator,
    updatePostValidator,
    updateUserValidator,
    userIdParamsValidator,
    userIdAndPostIdValidator
};
