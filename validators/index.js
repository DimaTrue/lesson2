const { loginValidator, signupValidator } = require('./auth.validator');
const { updateUserValidator, userIdParamsValidator } = require('./user.validator');
const {
    createPostValidator, postIdParamsValidator, updatePostValidator, userIdAndPostIdValidator
} = require('./post.validator');

module.exports = {
    createPostValidator,
    loginValidator,
    postIdParamsValidator,
    signupValidator,
    updatePostValidator,
    updateUserValidator,
    userIdParamsValidator,
    userIdAndPostIdValidator
};
