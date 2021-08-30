const { loginValidator, signupValidator } = require('./auth.validator');
const { updateUserValidator, userIdParamsValidator } = require('./user.validator');
const { createPostValidator, updatePostValidator, userIdAndPostIdValidator } = require('./post.validator');

module.exports = {
    createPostValidator,
    loginValidator,
    signupValidator,
    updatePostValidator,
    updateUserValidator,
    userIdParamsValidator,
    userIdAndPostIdValidator
};
