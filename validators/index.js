const { loginValidator, signupValidator } = require('./auth.validator');
const { updateUserValidator } = require('./user.validator');
const { createPostValidator, updatePostValidator } = require('./post.validator');

module.exports = {
    createPostValidator,
    loginValidator,
    signupValidator,
    updatePostValidator,
    updateUserValidator
};
