const {
    confirmAdminValidatorBody,
    confirmValidator,
    forgotValidator,
    resetValidatorBody,
    resetValidatorQuery,
    loginValidator,
    signupValidator
} = require('./auth.validator');
const { getUsersQueryValidator, updateUserValidator, userIdParamsValidator } = require('./user.validator');
const {
    createPostValidator,
    getPostsQueryValidator,
    postIdParamsValidator,
    updatePostValidator,
    userIdAndPostIdValidator
} = require('./post.validator');

module.exports = {
    confirmAdminValidatorBody,
    confirmValidator,
    createPostValidator,
    forgotValidator,
    getPostsQueryValidator,
    getUsersQueryValidator,
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
